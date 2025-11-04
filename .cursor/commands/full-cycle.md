# Full Cycle — Master Orchestrator

## Goal
Execute an end-to-end AI-driven software development cycle for an enterprise-level project — from scan to release — using all available sub-commands sequentially.

## Scope
Entire repository.

## Actions
1. **Initialize Intelligence**
   - Run `/scan-project`  
   - Run `/generate-docs`  
   - Run `/validate-docs`
2. **Architectural Insight**
   - Run `/analyze-architecture`
3. **Feature Planning & Implementation**
   - Ask developer to specify feature scope.
   - Run `/plan-module` → `/implement-feature`
4. **Quality Assurance**
   - Run `/generate-tests` → `/validate-tests`
5. **Structural Optimization**
   - Run `/optimize-structure` → `/remove-dead-code` → `/optimize-performance`
6. **Finalization**
   - Run `/prepare-release`
7. **Report**
   - Consolidate all reports into `/docs/full-cycle-report.md`
   - Summarize warnings and next-steps.

## Rules
- Sequential execution only; stop on fatal error.
- Always confirm before running destructive or code-writing steps.
- Maintain one unified context (do not re-scan mid-flow).
- Respect `.cursor/config.json` settings for ignored folders or environments.

## Output
- `/docs/full-cycle-report.md`  
  Contains:
  - Project summary  
  - Updated architecture map  
  - Test & performance stats  
  - Release readiness checklist

## Example Use
/full-cycle


This command functions as the AI's **one-button enterprise project manager**, ensuring every module is scanned, documented, implemented, tested, optimized, and prepared for deployment.
