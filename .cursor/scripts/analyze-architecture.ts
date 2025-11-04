/**
 * @file analyze-architecture.ts
 * @module cursor-scripts
 * @description Analyze architecture, detect circular dependencies, and measure coupling
 * @author BharatERP
 * @created 2025-11-04
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
    module: string;
    layer: string;
    imports: string[];
  }>;
  dependencies: {
    external: string[];
    internal: {
      [module: string]: {
        imports: string[];
        importedBy: string[];
      };
    };
  };
}

interface CircularDependency {
  modules: string[];
  path: string[];
}

interface CouplingAnalysis {
  module: string;
  dependencies: number;
  dependents: number;
  couplingScore: number;
}

function loadProjectMap(): ProjectMap {
  const projectMapPath = path.join(process.cwd(), '.cursor', 'cache', 'project-map.json');
  return JSON.parse(fs.readFileSync(projectMapPath, 'utf-8'));
}

function resolveModule(importPath: string, fromModule: string, projectMap: ProjectMap): string | null {
  // Resolve relative imports and @/ imports to module names
  if (importPath.startsWith('@/')) {
    const cleanPath = importPath.substring(2);
    
    // Check if it matches a module path
    for (const module of projectMap.modules) {
      if (cleanPath.startsWith(module.path) || module.path.includes(cleanPath)) {
        return module.name;
      }
    }
    
    // Check lib/ files
    if (cleanPath.startsWith('lib/')) {
      return 'shared';
    }
    
    // Check app/ files
    if (cleanPath.startsWith('app/')) {
      const parts = cleanPath.split('/');
      if (parts.length >= 3 && parts[0] === 'app' && parts[1] === 'components') {
        if (parts[2] === 'editor') return 'editor';
        if (parts[2] === 'report-pages') return 'report-pages';
        if (parts[2] === 'report-primitives') return 'report-primitives';
        if (parts[2] === 'report') return 'report-components';
        if (parts[2] === 'reports') return 'reports';
      }
      if (parts.length >= 2 && parts[0] === 'app' && parts[1] === 'api') {
        if (parts[2] === 'reports') return 'reports';
        if (parts[2] === 'templates') return 'templates';
        if (parts[2] === 'export') return 'export';
      }
    }
  }
  
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    // Relative import - likely same module
    return fromModule;
  }
  
  return null;
}

function buildDependencyGraph(projectMap: ProjectMap): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();
  
  // Initialize all modules
  for (const module of projectMap.modules) {
    graph.set(module.name, new Set());
  }
  
  // Build dependencies from files
  for (const file of projectMap.files) {
    const fromModule = file.module;
    if (!fromModule || fromModule === 'unknown') continue;
    
    for (const importPath of file.imports) {
      const toModule = resolveModule(importPath, fromModule, projectMap);
      if (toModule && toModule !== fromModule && toModule !== 'unknown') {
        const deps = graph.get(fromModule) || new Set();
        deps.add(toModule);
        graph.set(fromModule, deps);
      }
    }
  }
  
  return graph;
}

function detectCircularDependencies(graph: Map<string, Set<string>>): CircularDependency[] {
  const circular: CircularDependency[] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const path: string[] = [];
  
  function dfs(node: string): void {
    visited.add(node);
    recursionStack.add(node);
    path.push(node);
    
    const neighbors = graph.get(node) || new Set();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      } else if (recursionStack.has(neighbor)) {
        // Found a cycle
        const cycleStart = path.indexOf(neighbor);
        const cycle = path.slice(cycleStart);
        cycle.push(neighbor); // Complete the cycle
        circular.push({
          modules: Array.from(new Set(cycle)),
          path: [...cycle]
        });
      }
    }
    
    recursionStack.delete(node);
    path.pop();
  }
  
  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }
  
  return circular;
}

function analyzeCoupling(projectMap: ProjectMap, graph: Map<string, Set<string>>): CouplingAnalysis[] {
  const coupling: CouplingAnalysis[] = [];
  
  // Build reverse graph (dependents)
  const dependentsMap = new Map<string, Set<string>>();
  for (const module of graph.keys()) {
    dependentsMap.set(module, new Set());
  }
  
  for (const [module, deps] of graph.entries()) {
    for (const dep of deps) {
      const dependents = dependentsMap.get(dep) || new Set();
      dependents.add(module);
      dependentsMap.set(dep, dependents);
    }
  }
  
  // Calculate coupling scores
  for (const module of graph.keys()) {
    const dependencies = graph.get(module)?.size || 0;
    const dependents = dependentsMap.get(module)?.size || 0;
    const couplingScore = dependencies + dependents;
    
    coupling.push({
      module,
      dependencies,
      dependents,
      couplingScore
    });
  }
  
  return coupling.sort((a, b) => b.couplingScore - a.couplingScore);
}

function analyzeLayers(projectMap: ProjectMap): Map<string, string[]> {
  const layers = new Map<string, string[]>();
  
  for (const module of projectMap.modules) {
    const layer = module.layer;
    if (!layers.has(layer)) {
      layers.set(layer, []);
    }
    layers.get(layer)!.push(module.name);
  }
  
  return layers;
}

function main() {
  console.log('Analyzing architecture...\n');
  
  const projectMap = loadProjectMap();
  const dependencyGraph = buildDependencyGraph(projectMap);
  const circularDeps = detectCircularDependencies(dependencyGraph);
  const coupling = analyzeCoupling(projectMap, dependencyGraph);
  const layers = analyzeLayers(projectMap);
  
  console.log('='.repeat(60));
  console.log('ARCHITECTURE ANALYSIS RESULTS');
  console.log('='.repeat(60));
  
  console.log('\n## Layers\n');
  for (const [layer, modules] of layers.entries()) {
    console.log(`${layer}:`);
    modules.forEach(m => console.log(`  - ${m}`));
    console.log();
  }
  
  console.log('\n## Circular Dependencies\n');
  if (circularDeps.length === 0) {
    console.log('✅ No circular dependencies detected\n');
  } else {
    console.log(`⚠️  Found ${circularDeps.length} circular dependency(ies):\n`);
    circularDeps.forEach((circ, idx) => {
      console.log(`${idx + 1}. ${circ.modules.join(' → ')} → ${circ.modules[0]}`);
      console.log(`   Path: ${circ.path.join(' → ')}`);
    });
  }
  
  console.log('\n## Coupling Analysis (Top 10)\n');
  coupling.slice(0, 10).forEach((c, idx) => {
    console.log(`${idx + 1}. ${c.module}:`);
    console.log(`   Dependencies: ${c.dependencies}`);
    console.log(`   Dependents: ${c.dependents}`);
    console.log(`   Coupling Score: ${c.couplingScore}`);
    console.log();
  });
  
  console.log('='.repeat(60));
  
  // Save analysis results
  const results = {
    layers: Object.fromEntries(layers),
    circularDependencies: circularDeps,
    coupling: coupling,
    dependencyGraph: Object.fromEntries(
      Array.from(dependencyGraph.entries()).map(([k, v]) => [k, Array.from(v)])
    )
  };
  
  const outputPath = path.join(process.cwd(), '.cursor', 'cache', 'architecture-analysis.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nAnalysis saved to: ${path.relative(process.cwd(), outputPath)}\n`);
}

if (require.main === module) {
  main();
}

export { loadProjectMap, buildDependencyGraph, detectCircularDependencies, analyzeCoupling, analyzeLayers };

