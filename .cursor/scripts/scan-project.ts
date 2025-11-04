/**
 * @file scan-project.ts
 * @module cursor-scripts
 * @description Deep project scan to build comprehensive project map
 * @author BharatERP
 * @created 2025-01-27
 */

import * as fs from 'fs';
import * as path from 'path';

// Types for the project map
interface ProjectMap {
  scanDate: string;
  projectInfo: {
    name: string;
    type: string;
    framework: string;
    version?: string;
  };
  modules: ModuleInfo[];
  files: FileInfo[];
  dependencies: {
    external: string[];
    internal: DependencyGraph;
  };
  documentation: {
    modules: DocInfo[];
    missing: string[];
    invalid: string[];
  };
  summary: {
    totalFiles: number;
    totalModules: number;
    missingDocs: number;
    invalidDocHeaders: number;
  };
}

interface ModuleInfo {
  name: string;
  path: string;
  layer: 'frontend' | 'backend' | 'shared' | 'api' | 'config';
  files: string[];
  dependencies: string[];
}

interface FileInfo {
  path: string;
  type: 'page' | 'api-route' | 'component' | 'utility' | 'config' | 'documentation' | 'schema' | 'other';
  module?: string;
  layer: 'frontend' | 'backend' | 'shared' | 'api' | 'config';
  lineCount: number;
  size: number;
  imports: string[];
}

interface DocInfo {
  path: string;
  module?: string;
  hasYamlHeader: boolean;
  yamlValid: boolean;
  lastModified?: string;
}

interface DependencyGraph {
  [module: string]: {
    imports: string[];
    importedBy: string[];
  };
}

// Configuration
const EXCLUDE_DIRS = ['node_modules', 'dist', 'build', 'coverage', '.next', '.git', '.cursor/cache'];
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'];
const ROOT_DIR = process.cwd();

// Module patterns
const MODULE_PATTERNS = {
  editor: ['app/components/editor', 'app/editor'],
  reports: ['app/components/reports', 'app/reports', 'app/api/reports'],
  templates: ['app/api/templates', 'app/data/templates'],
  export: ['app/api/export', 'app/export'],
  'report-pages': ['app/components/report-pages'],
  'report-primitives': ['app/components/report-primitives'],
  'report-components': ['app/components/report'],
  api: ['app/api'],
  shared: ['lib'],
  prisma: ['prisma'],
  docs: ['docs'],
};

/**
 * Check if a directory should be excluded
 */
function shouldExclude(dirPath: string): boolean {
  const relativePath = path.relative(ROOT_DIR, dirPath);
  return EXCLUDE_DIRS.some(exclude => 
    relativePath.includes(exclude) || path.basename(dirPath).startsWith('.')
  );
}

/**
 * Get all files recursively
 */
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!shouldExclude(filePath)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (FILE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Determine module from file path
 */
function getModuleFromPath(filePath: string): { name: string; layer: string } | null {
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');

  for (const [moduleName, patterns] of Object.entries(MODULE_PATTERNS)) {
    for (const pattern of patterns) {
      if (relativePath.startsWith(pattern)) {
        let layer: string = 'frontend';
        if (moduleName === 'api' || relativePath.includes('/api/')) {
          layer = 'api';
        } else if (moduleName === 'shared' || relativePath.startsWith('lib/')) {
          layer = 'shared';
        } else if (moduleName === 'prisma') {
          layer = 'config';
        } else if (relativePath.includes('/api/')) {
          layer = 'backend';
        }
        return { name: moduleName, layer };
      }
    }
  }

  // Default classification
  if (relativePath.startsWith('app/')) {
    return { name: 'app', layer: 'frontend' };
  }
  if (relativePath.startsWith('lib/')) {
    return { name: 'shared', layer: 'shared' };
  }
  if (relativePath.startsWith('prisma/')) {
    return { name: 'prisma', layer: 'config' };
  }

  return null;
}

/**
 * Determine file type
 */
function getFileType(filePath: string): FileInfo['type'] {
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const fileName = path.basename(filePath);

  if (fileName === 'page.tsx' || fileName === 'page.ts') {
    return 'page';
  }
  if (fileName === 'route.ts' || fileName === 'route.tsx') {
    return 'api-route';
  }
  if (relativePath.includes('/components/')) {
    return 'component';
  }
  if (relativePath.startsWith('lib/')) {
    return 'utility';
  }
  if (fileName.includes('.config.') || fileName === 'package.json' || fileName === 'tsconfig.json') {
    return 'config';
  }
  if (relativePath.includes('docs/') || fileName.endsWith('.md')) {
    return 'documentation';
  }
  if (fileName === 'schema.prisma') {
    return 'schema';
  }

  return 'other';
}

/**
 * Extract imports from file content
 */
function extractImports(content: string): string[] {
  const imports: string[] = [];
  
  // Match import statements
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      // External dependency
      const packageName = importPath.split('/')[0];
      if (!imports.includes(packageName)) {
        imports.push(packageName);
      }
    } else {
      // Internal import
      imports.push(importPath);
    }
  }

  // Match require statements
  const requireRegex = /require\s*\(['"]([^'"]+)['"]\)/g;
  while ((match = requireRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      const packageName = importPath.split('/')[0];
      if (!imports.includes(packageName)) {
        imports.push(packageName);
      }
    } else {
      imports.push(importPath);
    }
  }

  return imports;
}

/**
 * Check if markdown file has YAML frontmatter
 */
function checkYamlFrontmatter(filePath: string): { hasYaml: boolean; valid: boolean } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const yamlRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(yamlRegex);
    
    if (!match) {
      return { hasYaml: false, valid: false };
    }

    // Basic YAML validation (check for key-value pairs)
    const yamlContent = match[1];
    const hasKeyValuePairs = /^[a-zA-Z_][a-zA-Z0-9_]*\s*:/.test(yamlContent);
    
    return { hasYaml: true, valid: hasKeyValuePairs };
  } catch {
    return { hasYaml: false, valid: false };
  }
}

/**
 * Get file statistics
 */
function getFileStats(filePath: string): { lineCount: number; size: number } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return {
      lineCount: content.split('\n').length,
      size: fs.statSync(filePath).size,
    };
  } catch {
    return { lineCount: 0, size: 0 };
  }
}

/**
 * Main scan function
 */
function scanProject(): ProjectMap {
  console.log('Starting project scan...\n');

  // Read package.json
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Get all files
  console.log('Scanning files...');
  const allFiles = getAllFiles(ROOT_DIR);
  console.log(`Found ${allFiles.length} files\n`);

  // Process files
  const fileInfos: FileInfo[] = [];
  const moduleMap = new Map<string, ModuleInfo>();
  const externalDeps = new Set<string>();
  const internalDeps: DependencyGraph = {};
  const docInfos: DocInfo[] = [];
  const missingDocs: string[] = [];
  const invalidDocs: string[] = [];

  console.log('Processing files...');
  for (const filePath of allFiles) {
    const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
    const stats = getFileStats(filePath);
    const moduleInfo = getModuleFromPath(filePath);
    const fileType = getFileType(filePath);

    let imports: string[] = [];
    if (['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(filePath))) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        imports = extractImports(content);
        
        // Track external dependencies
        imports.forEach(imp => {
          if (!imp.startsWith('.') && !imp.startsWith('@/') && !imp.startsWith('/')) {
            externalDeps.add(imp);
          }
        });
      } catch (err) {
        console.warn(`Warning: Could not read ${relativePath}`);
      }
    }

    const layer = moduleInfo?.layer || (filePath.includes('/api/') ? 'api' : 'frontend');
    const moduleName = moduleInfo?.name || 'unknown';

    const fileInfo: FileInfo = {
      path: relativePath,
      type: fileType,
      module: moduleName,
      layer: layer as FileInfo['layer'],
      lineCount: stats.lineCount,
      size: stats.size,
      imports,
    };

    fileInfos.push(fileInfo);

    // Update module map
    if (!moduleMap.has(moduleName)) {
      moduleMap.set(moduleName, {
        name: moduleName,
        path: path.dirname(relativePath),
        layer: layer as ModuleInfo['layer'],
        files: [],
        dependencies: [],
      });
    }

    const module = moduleMap.get(moduleName)!;
    module.files.push(relativePath);

    // Track internal dependencies
    imports.forEach(imp => {
      if (imp.startsWith('.') || imp.startsWith('@/')) {
        if (!internalDeps[moduleName]) {
          internalDeps[moduleName] = { imports: [], importedBy: [] };
        }
        if (!internalDeps[moduleName].imports.includes(imp)) {
          internalDeps[moduleName].imports.push(imp);
        }
      }
    });

    // Check for documentation
    if (filePath.endsWith('.md')) {
      const yamlCheck = checkYamlFrontmatter(filePath);
      docInfos.push({
        path: relativePath,
        module: moduleName,
        hasYamlHeader: yamlCheck.hasYaml,
        yamlValid: yamlCheck.valid,
      });

      if (!yamlCheck.hasYaml || !yamlCheck.valid) {
        if (!yamlCheck.hasYaml) {
          missingDocs.push(relativePath);
        } else {
          invalidDocs.push(relativePath);
        }
      }
    }

    // Check for missing MODULE_DOC.md or .doc.md
    const dirPath = path.dirname(filePath);
    const dirRelativePath = path.relative(ROOT_DIR, dirPath).replace(/\\/g, '/');
    const moduleDocPath = path.join(dirPath, 'MODULE_DOC.md');
    const docMdPath = path.join(dirPath, path.basename(dirPath) + '.doc.md');
    
    if (moduleInfo && !fs.existsSync(moduleDocPath) && !fs.existsSync(docMdPath)) {
      // Only mark as missing if it's a significant module directory
      if (dirRelativePath.split('/').length <= 3 && !dirRelativePath.includes('node_modules')) {
        if (!missingDocs.includes(dirRelativePath)) {
          missingDocs.push(dirRelativePath);
        }
      }
    }
  }

  console.log(`Processed ${fileInfos.length} files\n`);

  // Build modules array
  const modules: ModuleInfo[] = Array.from(moduleMap.values());

  // Build project map
  const projectMap: ProjectMap = {
    scanDate: new Date().toISOString(),
    projectInfo: {
      name: packageJson.name || 'editor-test',
      type: 'nextjs',
      framework: 'next.js',
      version: packageJson.version,
    },
    modules,
    files: fileInfos,
    dependencies: {
      external: Array.from(externalDeps).sort(),
      internal: internalDeps,
    },
    documentation: {
      modules: docInfos,
      missing: missingDocs,
      invalid: invalidDocs,
    },
    summary: {
      totalFiles: fileInfos.length,
      totalModules: modules.length,
      missingDocs: missingDocs.length,
      invalidDocHeaders: invalidDocs.length,
    },
  };

  return projectMap;
}

/**
 * Save project map to JSON
 */
function saveProjectMap(projectMap: ProjectMap): void {
  const cacheDir = path.join(ROOT_DIR, '.cursor', 'cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const outputPath = path.join(cacheDir, 'project-map.json');
  fs.writeFileSync(outputPath, JSON.stringify(projectMap, null, 2), 'utf-8');
  console.log(`Project map saved to: ${path.relative(ROOT_DIR, outputPath)}\n`);
}

/**
 * Print summary
 */
function printSummary(projectMap: ProjectMap): void {
  console.log('='.repeat(60));
  console.log('PROJECT SCAN SUMMARY');
  console.log('='.repeat(60));
  console.log(`Project: ${projectMap.projectInfo.name} (${projectMap.projectInfo.framework})`);
  console.log(`Scan Date: ${new Date(projectMap.scanDate).toLocaleString()}`);
  console.log('');
  console.log('Statistics:');
  console.log(`  Total Files: ${projectMap.summary.totalFiles}`);
  console.log(`  Total Modules: ${projectMap.summary.totalModules}`);
  console.log(`  External Dependencies: ${projectMap.dependencies.external.length}`);
  console.log(`  Missing Documentation: ${projectMap.summary.missingDocs}`);
  console.log(`  Invalid Doc Headers: ${projectMap.summary.invalidDocHeaders}`);
  console.log('');
  console.log('Modules:');
  projectMap.modules.forEach(module => {
    console.log(`  - ${module.name} (${module.layer}): ${module.files.length} files`);
  });
  console.log('');
  if (projectMap.summary.missingDocs > 0) {
    console.log('Missing Documentation:');
    projectMap.documentation.missing.slice(0, 10).forEach(doc => {
      console.log(`  - ${doc}`);
    });
    if (projectMap.documentation.missing.length > 10) {
      console.log(`  ... and ${projectMap.documentation.missing.length - 10} more`);
    }
    console.log('');
  }
  if (projectMap.summary.invalidDocHeaders > 0) {
    console.log('Invalid Documentation Headers:');
    projectMap.documentation.invalid.slice(0, 10).forEach(doc => {
      console.log(`  - ${doc}`);
    });
    if (projectMap.documentation.invalid.length > 10) {
      console.log(`  ... and ${projectMap.documentation.invalid.length - 10} more`);
    }
    console.log('');
  }
  console.log('='.repeat(60));
}

// Main execution
if (require.main === module) {
  try {
    const projectMap = scanProject();
    saveProjectMap(projectMap);
    printSummary(projectMap);
  } catch (error) {
    console.error('Error during project scan:', error);
    process.exit(1);
  }
}

export { scanProject, saveProjectMap, printSummary };

