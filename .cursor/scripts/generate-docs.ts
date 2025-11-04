/**
 * @file generate-docs.ts
 * @module cursor-scripts
 * @description Generate .doc.md files for all modules based on project-map.json
 * @author BharatERP
 * @created 2025-01-27
 */

import * as fs from 'fs';
import * as path from 'path';

interface ProjectMap {
  modules: Array<{
    name: string;
    path: string;
    layer: string;
    files: string[];
    dependencies: string[];
  }>;
  files: Array<{
    path: string;
    type: string;
    module?: string;
    layer: string;
  }>;
}

interface DocGenerationResult {
  created: string[];
  updated: string[];
  skipped: string[];
  errors: Array<{ file: string; error: string }>;
}

const ROOT_DIR = process.cwd();
const PROJECT_MAP_PATH = path.join(ROOT_DIR, '.cursor', 'cache', 'project-map.json');
const STALE_DAYS = 30;

/**
 * Check if a file exists
 */
function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

/**
 * Get file modification date
 */
function getFileModDate(filePath: string): Date | null {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return null;
  }
}

/**
 * Check if file is stale (older than N days)
 */
function isStale(filePath: string, days: number = STALE_DAYS): boolean {
  const modDate = getFileModDate(filePath);
  if (!modDate) return false;
  
  const daysSinceMod = (Date.now() - modDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceMod > days;
}

/**
 * Backup existing file
 */
function backupFile(filePath: string): string | null {
  try {
    const backupPath = `${filePath}.backup.${Date.now()}`;
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  } catch (error) {
    console.warn(`Warning: Could not backup ${filePath}:`, error);
    return null;
  }
}

/**
 * Extract description from code files
 */
function extractDescription(modulePath: string, files: string[]): string {
  const descriptions: string[] = [];
  
  // Try to find comments in key files
  for (const file of files.slice(0, 5)) { // Check first 5 files
    const fullPath = path.join(ROOT_DIR, file);
    if (!fileExists(fullPath)) continue;
    
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Look for file header comments
      const headerMatch = content.match(/\/\*\*?\s*([^*]+?)\s*\*\//s);
      if (headerMatch) {
        const headerText = headerMatch[1].trim();
        if (headerText.length > 10 && headerText.length < 200) {
          descriptions.push(headerText);
        }
      }
      
      // Look for single-line comments at the top
      const lines = content.split('\n').slice(0, 10);
      for (const line of lines) {
        const commentMatch = line.match(/\/\/\s*(.+)/);
        if (commentMatch && commentMatch[1].length > 10 && commentMatch[1].length < 200) {
          const desc = commentMatch[1].trim();
          if (!desc.toLowerCase().includes('import') && !desc.toLowerCase().includes('export')) {
            descriptions.push(desc);
          }
        }
      }
      
      // Extract from function/component names
      const funcMatch = content.match(/(?:export\s+(?:default\s+)?(?:function|const|class)\s+)(\w+)/);
      if (funcMatch) {
        const name = funcMatch[1];
        // Convert camelCase/PascalCase to readable description
        const readable = name
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
        if (readable.length > 5) {
          descriptions.push(readable);
        }
      }
    } catch {
      // Skip files that can't be read
    }
  }
  
  // Generate from module name and path if no descriptions found
  if (descriptions.length === 0) {
    const moduleName = path.basename(modulePath);
    const readable = moduleName
      .replace(/-/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
    
    if (modulePath.includes('/api/')) {
      return `API endpoints for ${readable}`;
    } else if (modulePath.includes('/components/')) {
      return `React components for ${readable}`;
    } else {
      return `${readable} module`;
    }
  }
  
  // Return first meaningful description
  return descriptions[0] || `${modulePath} module`;
}

/**
 * Generate functional summary from module files
 */
function generateFunctionalSummary(moduleName: string, modulePath: string, files: string[]): string {
  const summary: string[] = [];
  
  // Analyze file types
  const fileTypes = {
    pages: files.filter(f => f.includes('/page.tsx') || f.includes('/page.ts')).length,
    routes: files.filter(f => f.includes('/route.ts')).length,
    components: files.filter(f => f.includes('/components/')).length,
    utilities: files.filter(f => f.startsWith('lib/')).length,
  };
  
  summary.push(`## Overview`);
  summary.push(``);
  
  if (fileTypes.pages > 0) {
    summary.push(`This module contains ${fileTypes.pages} page(s) for user interface.`);
  }
  if (fileTypes.routes > 0) {
    summary.push(`This module provides ${fileTypes.routes} API route(s) for backend functionality.`);
  }
  if (fileTypes.components > 0) {
    summary.push(`This module includes ${fileTypes.components} React component(s).`);
  }
  if (fileTypes.utilities > 0) {
    summary.push(`This module contains ${fileTypes.utilities} utility function(s).`);
  }
  
  summary.push(``);
  summary.push(`## Files`);
  summary.push(``);
  summary.push(`Total files: ${files.length}`);
  summary.push(``);
  
  // List key files
  const keyFiles = files.slice(0, 10);
  for (const file of keyFiles) {
    const fileName = path.basename(file);
    summary.push(`- \`${fileName}\``);
  }
  
  if (files.length > 10) {
    summary.push(`- ... and ${files.length - 10} more files`);
  }
  
  summary.push(``);
  summary.push(`## Location`);
  summary.push(``);
  summary.push(`\`${modulePath}\``);
  
  return summary.join('\n');
}

/**
 * Check if doc has manual sections (preserve them)
 */
function hasManualSections(docContent: string): boolean {
  // Check for common manual sections
  const manualMarkers = [
    '## Purpose',
    '## Flow',
    '## Architecture',
    '## Examples',
    '## Testing',
    '## Change-log',
    '## Changelog',
  ];
  
  return manualMarkers.some(marker => docContent.includes(marker));
}

/**
 * Extract manual sections from existing doc
 */
function extractManualSections(docContent: string): string {
  const manualSections: string[] = [];
  const lines = docContent.split('\n');
  
  let inManualSection = false;
  let currentSection: string[] = [];
  
  for (const line of lines) {
    // Check if line starts a manual section
    if (line.match(/^##\s+(Purpose|Flow|Architecture|Examples|Testing|Change-log|Changelog|Dependencies|APIs|Env vars)/i)) {
      if (currentSection.length > 0) {
        manualSections.push(currentSection.join('\n'));
      }
      currentSection = [line];
      inManualSection = true;
    } else if (inManualSection) {
      // Check if we hit the YAML header end (if present)
      if (line.trim() === '---' && currentSection.length === 0) {
        continue;
      }
      currentSection.push(line);
    }
  }
  
  if (currentSection.length > 0) {
    manualSections.push(currentSection.join('\n'));
  }
  
  return manualSections.length > 0 ? '\n\n' + manualSections.join('\n\n') : '';
}

/**
 * Generate YAML header
 */
function generateYamlHeader(
  fileName: string,
  description: string,
  layer: string,
  dependencies: string[]
): string {
  const yaml = [
    '---',
    `file: ${fileName}`,
    `description: ${description}`,
    `layer: ${layer}`,
    `dependencies: [${dependencies.map(d => `"${d}"`).join(', ')}]`,
    `status: draft`,
    `last_updated: ${new Date().toISOString().split('T')[0]}`,
    '---',
  ];
  
  return yaml.join('\n');
}

/**
 * Calculate module root directory for doc placement
 * Prefer the directory where most files are located
 */
function calculateModuleRoot(files: string[]): string {
  if (files.length === 0) return '.';
  if (files.length === 1) return path.dirname(files[0]);
  
  // Count files per directory
  const dirCounts = new Map<string, number>();
  const dirs = files.map(f => {
    const dir = path.dirname(f).replace(/\\/g, '/');
    dirCounts.set(dir, (dirCounts.get(dir) || 0) + 1);
    return dir;
  });
  
  // Find directory with most files
  let maxCount = 0;
  let mostCommonDir = dirs[0];
  for (const [dir, count] of dirCounts.entries()) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonDir = dir;
    }
  }
  
  // If we have a clear majority (more than 50% of files), use that directory
  if (maxCount > files.length / 2) {
    return mostCommonDir;
  }
  
  // Otherwise, find common path prefix
  const normalizedPaths = files.map(f => path.dirname(f).replace(/\\/g, '/'));
  const pathParts = normalizedPaths.map(p => p.split('/'));
  
  let commonParts: string[] = [];
  const minLength = Math.min(...pathParts.map(p => p.length));
  
  for (let i = 0; i < minLength; i++) {
    const part = pathParts[0][i];
    if (pathParts.every(parts => parts[i] === part)) {
      commonParts.push(part);
    } else {
      break;
    }
  }
  
  return commonParts.length > 0 ? commonParts.join('/') : mostCommonDir;
}

/**
 * Create or update doc file
 */
function createDocFile(
  modulePath: string,
  moduleName: string,
  layer: string,
  files: string[],
  dependencies: string[],
  result: DocGenerationResult
): void {
  // Calculate actual module root from files
  const actualModuleRoot = calculateModuleRoot(files);
  
  // Determine doc file path - use actual module root
  const docFileName = moduleName === 'unknown' ? 'README.doc.md' : `${moduleName}.doc.md`;
  const docPath = path.join(ROOT_DIR, actualModuleRoot, docFileName);
  
  // Skip if module path is root and not unknown
  if (actualModuleRoot === '.' && moduleName !== 'unknown') {
    return;
  }
  
  // Also check for MODULE_DOC.md
  const moduleDocPath = path.join(ROOT_DIR, actualModuleRoot, 'MODULE_DOC.md');
  const moduleDocExists = fileExists(moduleDocPath);
  
  const docExists = fileExists(docPath);
  const existingDoc = docExists ? fs.readFileSync(docPath, 'utf-8') : '';
  const existingModuleDoc = moduleDocExists ? fs.readFileSync(moduleDocPath, 'utf-8') : '';
  
  // If MODULE_DOC.md exists, use that path instead
  const targetPath = moduleDocExists ? moduleDocPath : docPath;
  const existingContent = moduleDocExists ? existingModuleDoc : existingDoc;
  
  // Extract description
  const description = extractDescription(actualModuleRoot, files);
  
  // Generate content
  const yamlHeader = generateYamlHeader(docFileName, description, layer, dependencies);
  const functionalSummary = generateFunctionalSummary(moduleName, actualModuleRoot, files);
  
  let newContent = yamlHeader + '\n\n' + functionalSummary;
  
  // If updating existing doc, preserve manual sections
  if (existingContent && hasManualSections(existingContent)) {
    const manualSections = extractManualSections(existingContent);
    if (manualSections) {
      newContent += manualSections;
    }
    
    // Backup existing file
    const backupPath = backupFile(targetPath);
    if (backupPath) {
      console.log(`  Backed up to: ${path.relative(ROOT_DIR, backupPath)}`);
    }
    
    result.updated.push(targetPath);
  } else if (!existingContent) {
    // New file
    result.created.push(targetPath);
  } else {
    // Existing file but no manual sections - update if stale
    if (isStale(targetPath)) {
      const backupPath = backupFile(targetPath);
      if (backupPath) {
        console.log(`  Backed up to: ${path.relative(ROOT_DIR, backupPath)}`);
      }
      result.updated.push(targetPath);
    } else {
      result.skipped.push(targetPath);
      return;
    }
  }
  
  // Write file
  try {
    // Ensure directory exists
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(targetPath, newContent, 'utf-8');
    console.log(`  ✓ ${existingContent ? 'Updated' : 'Created'}: ${path.relative(ROOT_DIR, targetPath)}`);
  } catch (error) {
    result.errors.push({
      file: targetPath,
      error: error instanceof Error ? error.message : String(error),
    });
    console.error(`  ✗ Error: ${targetPath}`, error);
  }
}

/**
 * Main function
 */
function generateDocs(): void {
  console.log('Generating documentation...\n');
  
  // Read project map
  if (!fileExists(PROJECT_MAP_PATH)) {
    console.error(`Error: Project map not found at ${PROJECT_MAP_PATH}`);
    console.error('Please run /1.scan-project first.');
    process.exit(1);
  }
  
  const projectMap: ProjectMap = JSON.parse(
    fs.readFileSync(PROJECT_MAP_PATH, 'utf-8')
  );
  
  console.log(`Found ${projectMap.modules.length} modules\n`);
  
  const result: DocGenerationResult = {
    created: [],
    updated: [],
    skipped: [],
    errors: [],
  };
  
  // Process each module
  for (const module of projectMap.modules) {
    console.log(`Processing module: ${module.name} (${module.layer})`);
    
    createDocFile(
      module.path,
      module.name,
      module.layer,
      module.files,
      module.dependencies,
      result
    );
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('DOCUMENTATION GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Created: ${result.created.length}`);
  console.log(`Updated: ${result.updated.length}`);
  console.log(`Skipped: ${result.skipped.length}`);
  console.log(`Errors: ${result.errors.length}`);
  
  if (result.created.length > 0) {
    console.log('\nCreated files:');
    result.created.forEach(file => {
      console.log(`  - ${path.relative(ROOT_DIR, file)}`);
    });
  }
  
  if (result.updated.length > 0) {
    console.log('\nUpdated files:');
    result.updated.forEach(file => {
      console.log(`  - ${path.relative(ROOT_DIR, file)}`);
    });
  }
  
  if (result.errors.length > 0) {
    console.log('\nErrors:');
    result.errors.forEach(({ file, error }) => {
      console.log(`  - ${path.relative(ROOT_DIR, file)}: ${error}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
}

// Run if executed directly
if (require.main === module) {
  try {
    generateDocs();
  } catch (error) {
    console.error('Error during documentation generation:', error);
    process.exit(1);
  }
}

export { generateDocs };

