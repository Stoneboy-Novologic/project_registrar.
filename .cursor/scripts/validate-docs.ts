/**
 * @file validate-docs.ts
 * @module cursor-scripts
 * @description Validate documentation consistency across the codebase
 * @author BharatERP
 * @created 2025-01-27
 */

import * as fs from 'fs';
import * as path from 'path';

interface DocMetadata {
  file?: string;
  description?: string;
  layer?: string;
  dependencies?: string[];
  status?: string;
  last_updated?: string;
  [key: string]: any;
}

interface ValidationIssue {
  type: 'missing_metadata' | 'invalid_path' | 'outdated_doc' | 'dependency_mismatch' | 'invalid_format';
  severity: 'error' | 'warning';
  message: string;
  details?: any;
}

interface DocValidation {
  file: string;
  metadata: DocMetadata;
  issues: ValidationIssue[];
  isValid: boolean;
}

interface ValidationReport {
  scanDate: string;
  totalDocs: number;
  validDocs: number;
  invalidDocs: number;
  outdatedDocs: number;
  validationResults: DocValidation[];
  summary: {
    missingMetadata: number;
    invalidPaths: number;
    outdatedContent: number;
    dependencyMismatches: number;
    formatErrors: number;
  };
}

const ROOT_DIR = process.cwd();
const REPORT_PATH = path.join(ROOT_DIR, '.cursor', 'cache', 'docs-report.json');

/**
 * Find all .doc.md files
 */
function findDocFiles(): string[] {
  const docFiles: string[] = [];
  
  function scanDirectory(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip excluded directories
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.') || 
            entry.name === 'node_modules' || 
            entry.name === 'dist' || 
            entry.name === 'build' || 
            entry.name === '.next') {
          continue;
        }
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.doc.md')) {
        docFiles.push(fullPath);
      }
    }
  }
  
  scanDirectory(ROOT_DIR);
  return docFiles;
}

/**
 * Parse YAML frontmatter from markdown file
 */
function parseYamlFrontmatter(content: string): { metadata: DocMetadata; body: string } | null {
  const yamlRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(yamlRegex);
  
  if (!match) {
    return null;
  }
  
  const yamlContent = match[1];
  const body = content.slice(match[0].length);
  const metadata: DocMetadata = {};
  
  // Simple YAML parser for key-value pairs
  const lines = yamlContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.slice(0, colonIndex).trim();
    let value: any = trimmed.slice(colonIndex + 1).trim();
    
    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1).trim();
      if (arrayContent) {
        value = arrayContent.split(',').map(v => {
          const trimmed = v.trim().replace(/^["']|["']$/g, '');
          return trimmed;
        });
      } else {
        value = [];
      }
    }
    
    metadata[key] = value;
  }
  
  return { metadata, body };
}

/**
 * Validate metadata keys
 */
function validateMetadata(metadata: DocMetadata, filePath: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const requiredKeys = ['file', 'description', 'layer', 'status', 'last_updated'];
  
  for (const key of requiredKeys) {
    if (!(key in metadata) || metadata[key] === undefined || metadata[key] === '') {
      issues.push({
        type: 'missing_metadata',
        severity: 'error',
        message: `Missing required metadata key: ${key}`,
        details: { key },
      });
    }
  }
  
  // Validate layer value
  if (metadata.layer && !['frontend', 'backend', 'shared', 'api', 'config'].includes(metadata.layer)) {
    issues.push({
      type: 'invalid_format',
      severity: 'warning',
      message: `Invalid layer value: ${metadata.layer}. Expected: frontend, backend, shared, api, or config`,
      details: { value: metadata.layer },
    });
  }
  
  // Validate status value
  if (metadata.status && !['draft', 'review', 'approved', 'deprecated'].includes(metadata.status)) {
    issues.push({
      type: 'invalid_format',
      severity: 'warning',
      message: `Invalid status value: ${metadata.status}`,
      details: { value: metadata.status },
    });
  }
  
  // Validate last_updated format
  if (metadata.last_updated) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(metadata.last_updated)) {
      issues.push({
        type: 'invalid_format',
        severity: 'warning',
        message: `Invalid date format for last_updated: ${metadata.last_updated}. Expected YYYY-MM-DD`,
        details: { value: metadata.last_updated },
      });
    }
  }
  
  return issues;
}

/**
 * Check if file path in metadata exists
 */
function validateFilePaths(metadata: DocMetadata, docFilePath: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const docDir = path.dirname(docFilePath);
  
  // Check if the 'file' field points to a valid file
  if (metadata.file) {
    // The file field usually contains the doc filename, so check if doc file exists
    const expectedDocPath = path.join(docDir, metadata.file);
    if (!fs.existsSync(expectedDocPath) && expectedDocPath !== docFilePath) {
      issues.push({
        type: 'invalid_path',
        severity: 'warning',
        message: `File path in metadata does not match actual doc file location`,
        details: { expected: expectedDocPath, actual: docFilePath },
      });
    }
  }
  
  return issues;
}

/**
 * Extract file paths mentioned in doc body
 * Only extract actual file path references, not just filenames in lists
 */
function extractFileReferences(body: string, docDir: string): string[] {
  const fileRefs: string[] = [];
  
  // Match code blocks with file paths
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks = body.match(codeBlockRegex) || [];
  
  for (const block of codeBlocks) {
    // Look for file paths in comments or imports
    const pathRegex = /(?:file|path|location|import|from|require)[:\s\(\)]+['"]?([^\s\n'"]+\.(ts|tsx|js|jsx|json))['"]?/gi;
    const matches = block.matchAll(pathRegex);
    for (const match of matches) {
      const filePath = match[1];
      // Only include if it looks like a path (has slashes or starts with @/)
      if (filePath.includes('/') || filePath.startsWith('@/')) {
        fileRefs.push(filePath);
      }
    }
  }
  
  // Match file references in markdown that are actual paths (not just filenames)
  // Look for paths with slashes or explicit path indicators
  const markdownPathRegex = /`([^`]+[/\\][^`]+\.(ts|tsx|js|jsx|json))`/g;
  const markdownMatches = body.matchAll(markdownPathRegex);
  for (const match of markdownMatches) {
    fileRefs.push(match[1]);
  }
  
  // Match explicit path references in text
  const explicitPathRegex = /(?:path|file|location)[:\s]+`?([^\s`]+\.(ts|tsx|js|jsx|json))`?/gi;
  const explicitMatches = body.matchAll(explicitPathRegex);
  for (const match of explicitMatches) {
    const filePath = match[1];
    if (filePath.includes('/') || filePath.startsWith('@/')) {
      fileRefs.push(filePath);
    }
  }
  
  return fileRefs;
}

/**
 * Check if referenced files exist
 */
function validateReferencedFiles(body: string, docFilePath: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const docDir = path.dirname(docFilePath);
  const fileRefs = extractFileReferences(body, docDir);
  
  for (const fileRef of fileRefs) {
    // Try relative to doc directory
    let fullPath = path.resolve(docDir, fileRef);
    if (!fs.existsSync(fullPath)) {
      // Try relative to root
      fullPath = path.resolve(ROOT_DIR, fileRef);
      if (!fs.existsSync(fullPath)) {
        issues.push({
          type: 'invalid_path',
          severity: 'warning',
          message: `Referenced file does not exist: ${fileRef}`,
          details: { fileRef, docDir },
        });
      }
    }
  }
  
  return issues;
}

/**
 * Extract imports from TypeScript/JavaScript files
 */
function extractImports(filePath: string): string[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const imports: string[] = [];
    
    // Match import statements
    const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return imports;
  } catch {
    return [];
  }
}

/**
 * Validate dependencies match actual imports
 */
function validateDependencies(
  metadata: DocMetadata,
  docFilePath: string,
  projectMapPath: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  // Try to load project map to get module files
  let moduleFiles: string[] = [];
  try {
    if (fs.existsSync(projectMapPath)) {
      const projectMap = JSON.parse(fs.readFileSync(projectMapPath, 'utf-8'));
      const docDir = path.dirname(docFilePath).replace(/\\/g, '/');
      
      // Find module that matches this doc
      for (const module of projectMap.modules || []) {
        const modulePath = module.path.replace(/\\/g, '/');
        if (docDir.includes(modulePath) || modulePath.includes(docDir)) {
          moduleFiles = (module.files || []).filter((f: string) => 
            f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx')
          );
          break;
        }
      }
    }
  } catch {
    // Project map not available, skip dependency validation
  }
  
  if (moduleFiles.length === 0) {
    return issues; // Can't validate without file list
  }
  
  // Extract all imports from module files
  const allImports = new Set<string>();
  for (const file of moduleFiles.slice(0, 10)) { // Check first 10 files
    const fullPath = path.join(ROOT_DIR, file);
    if (fs.existsSync(fullPath)) {
      const imports = extractImports(fullPath);
      imports.forEach(imp => {
        // Only track internal dependencies
        if (imp.startsWith('.') || imp.startsWith('@/')) {
          allImports.add(imp);
        }
      });
    }
  }
  
  // Compare with documented dependencies
  const documentedDeps = metadata.dependencies || [];
  const actualDeps = Array.from(allImports);
  
  // Check for missing dependencies
  const missingInDocs = actualDeps.filter(dep => !documentedDeps.includes(dep));
  if (missingInDocs.length > 0) {
    issues.push({
      type: 'dependency_mismatch',
      severity: 'warning',
      message: `Documentation missing ${missingInDocs.length} dependency(ies) found in code`,
      details: { missing: missingInDocs },
    });
  }
  
  // Check for outdated dependencies
  const outdatedInDocs = documentedDeps.filter(dep => !actualDeps.includes(dep));
  if (outdatedInDocs.length > 0) {
    issues.push({
      type: 'dependency_mismatch',
      severity: 'warning',
      message: `Documentation lists ${outdatedInDocs.length} dependency(ies) not found in code`,
      details: { outdated: outdatedInDocs },
    });
  }
  
  return issues;
}

/**
 * Check if doc is outdated (older than 90 days)
 */
function checkOutdated(docFilePath: string, metadata: DocMetadata): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  try {
    const stats = fs.statSync(docFilePath);
    const docAge = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);
    
    if (docAge > 90) {
      issues.push({
        type: 'outdated_doc',
        severity: 'warning',
        message: `Documentation is ${Math.round(docAge)} days old and may be outdated`,
        details: { age: docAge, lastModified: stats.mtime.toISOString() },
      });
    }
    
    // Also check if last_updated is older than file modification
    if (metadata.last_updated) {
      const lastUpdated = new Date(metadata.last_updated);
      if (lastUpdated < stats.mtime && (stats.mtime.getTime() - lastUpdated.getTime()) > 7 * 24 * 60 * 60 * 1000) {
        issues.push({
          type: 'outdated_doc',
          severity: 'warning',
          message: `last_updated field is older than file modification date`,
          details: { 
            lastUpdated: metadata.last_updated, 
            fileModified: stats.mtime.toISOString() 
          },
        });
      }
    }
  } catch {
    // Can't check file stats
  }
  
  return issues;
}

/**
 * Validate a single doc file
 */
function validateDocFile(docFilePath: string, projectMapPath: string): DocValidation {
  const relativePath = path.relative(ROOT_DIR, docFilePath);
  const content = fs.readFileSync(docFilePath, 'utf-8');
  const parsed = parseYamlFrontmatter(content);
  
  if (!parsed) {
    return {
      file: relativePath,
      metadata: {},
      issues: [{
        type: 'invalid_format',
        severity: 'error',
        message: 'Missing or invalid YAML frontmatter',
      }],
      isValid: false,
    };
  }
  
  const { metadata, body } = parsed;
  const issues: ValidationIssue[] = [];
  
  // Run all validations
  issues.push(...validateMetadata(metadata, docFilePath));
  issues.push(...validateFilePaths(metadata, docFilePath));
  issues.push(...validateReferencedFiles(body, docFilePath));
  issues.push(...checkOutdated(docFilePath, metadata));
  
  // Try to validate dependencies if project map exists
  try {
    issues.push(...validateDependencies(metadata, docFilePath, projectMapPath));
  } catch {
    // Skip dependency validation if project map unavailable
  }
  
  const isValid = issues.filter(i => i.severity === 'error').length === 0;
  
  return {
    file: relativePath,
    metadata,
    issues,
    isValid,
  };
}

/**
 * Main validation function
 */
function validateDocs(): void {
  console.log('Validating documentation...\n');
  
  const docFiles = findDocFiles();
  console.log(`Found ${docFiles.length} documentation files\n`);
  
  const projectMapPath = path.join(ROOT_DIR, '.cursor', 'cache', 'project-map.json');
  
  const validations: DocValidation[] = [];
  
  for (const docFile of docFiles) {
    const relativePath = path.relative(ROOT_DIR, docFile);
    console.log(`Validating: ${relativePath}`);
    const validation = validateDocFile(docFile, projectMapPath);
    validations.push(validation);
    
    if (validation.issues.length > 0) {
      validation.issues.forEach(issue => {
        const icon = issue.severity === 'error' ? '✗' : '⚠';
        console.log(`  ${icon} ${issue.message}`);
      });
    } else {
      console.log(`  ✓ Valid`);
    }
  }
  
  // Calculate statistics
  const validDocs = validations.filter(v => v.isValid).length;
  const invalidDocs = validations.length - validDocs;
  const outdatedDocs = validations.filter(v => 
    v.issues.some(i => i.type === 'outdated_doc')
  ).length;
  
  const summary = {
    missingMetadata: validations.reduce((sum, v) => 
      sum + v.issues.filter(i => i.type === 'missing_metadata').length, 0),
    invalidPaths: validations.reduce((sum, v) => 
      sum + v.issues.filter(i => i.type === 'invalid_path').length, 0),
    outdatedContent: validations.reduce((sum, v) => 
      sum + v.issues.filter(i => i.type === 'outdated_doc').length, 0),
    dependencyMismatches: validations.reduce((sum, v) => 
      sum + v.issues.filter(i => i.type === 'dependency_mismatch').length, 0),
    formatErrors: validations.reduce((sum, v) => 
      sum + v.issues.filter(i => i.type === 'invalid_format').length, 0),
  };
  
  const report: ValidationReport = {
    scanDate: new Date().toISOString(),
    totalDocs: validations.length,
    validDocs,
    invalidDocs,
    outdatedDocs,
    validationResults: validations,
    summary,
  };
  
  // Save report
  const cacheDir = path.dirname(REPORT_PATH);
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('DOCUMENTATION VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Docs: ${report.totalDocs}`);
  console.log(`Valid: ${report.validDocs} (${Math.round((report.validDocs / report.totalDocs) * 100)}%)`);
  console.log(`Invalid: ${report.invalidDocs} (${Math.round((report.invalidDocs / report.totalDocs) * 100)}%)`);
  console.log(`Outdated: ${report.outdatedDocs} (${Math.round((report.outdatedDocs / report.totalDocs) * 100)}%)`);
  console.log('');
  console.log('Issues:');
  console.log(`  Missing Metadata: ${summary.missingMetadata}`);
  console.log(`  Invalid Paths: ${summary.invalidPaths}`);
  console.log(`  Outdated Content: ${summary.outdatedContent}`);
  console.log(`  Dependency Mismatches: ${summary.dependencyMismatches}`);
  console.log(`  Format Errors: ${summary.formatErrors}`);
  console.log('');
  console.log(`Report saved to: ${path.relative(ROOT_DIR, REPORT_PATH)}`);
  console.log('='.repeat(60));
}

// Run if executed directly
if (require.main === module) {
  try {
    validateDocs();
  } catch (error) {
    console.error('Error during validation:', error);
    process.exit(1);
  }
}

export { validateDocs };

