#!/usr/bin/env node

/**
 * Script to validate challenge solutions by extracting the solution code
 * and running the test cases against it.
 * 
 * Usage: node scripts/validate-challenges.js "file1.ts file2.ts ..."
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHALLENGES_DIR = path.join(__dirname, '../src/common/challenges');
const TEMP_DIR = path.join(__dirname, '../.temp-challenge-tests');

// Clean up temp directory
function cleanup() {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
}

// Extract solution and testCases from challenge file
function extractChallengeData(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Use regex to extract solution and testCases from the problem object
  // Match solution: `...` (handles multi-line template literals)
  const solutionMatch = content.match(/solution:\s*`([\s\S]*?)`\s*,/);

  // Match testCases: `...` (handles multi-line template literals)
  const testCasesMatch = content.match(/testCases:\s*`([\s\S]*?)`\s*,/);

  if (!solutionMatch || !solutionMatch[1]) {
    throw new Error(`Could not find solution in ${filePath}`);
  }

  if (!testCasesMatch || !testCasesMatch[1]) {
    throw new Error(`Could not find testCases in ${filePath}`);
  }

  return {
    solution: solutionMatch[1],
    testCases: testCasesMatch[1],
  };
}

// Create temporary test files for a challenge
function createTestFiles(challengeFile, solution, testCases) {
  const challengeId = path.basename(challengeFile, '.ts');
  const testDir = path.join(TEMP_DIR, challengeId);

  fs.mkdirSync(testDir, { recursive: true });

  // Ensure solution has export default
  let processedSolution = solution.trim();

  // If solution doesn't have 'export default', try to add it
  if (!processedSolution.includes('export default')) {
    // Check if it starts with 'function' (without export)
    if (processedSolution.match(/^function\s+\w+/)) {
      // Replace 'function name' with 'export default function name'
      processedSolution = processedSolution.replace(/^function\s+(\w+)/, 'export default function $1');
    } else if (processedSolution.match(/^(const|let|var)\s+\w+\s*=/)) {
      // For const/let/var declarations, wrap with export default
      processedSolution = `export default ${processedSolution}`;
    } else if (!processedSolution.startsWith('export')) {
      // If it doesn't start with export at all, add export default
      processedSolution = `export default ${processedSolution}`;
    }
  }

  // Create code.ts with the solution (simulating user code)
  const codeFile = path.join(testDir, 'code.ts');
  fs.writeFileSync(codeFile, processedSolution);

  // Create solution.ts with the solution (the reference implementation)
  const solutionFile = path.join(testDir, 'solution.ts');
  fs.writeFileSync(solutionFile, processedSolution);

  // Create test file
  const testFile = path.join(testDir, 'challenge.test.ts');
  fs.writeFileSync(testFile, testCases);

  return testDir;
}

// Run tests for a challenge
function runTests(testDir, challengeFile) {
  const challengeId = path.basename(challengeFile, '.ts');
  const projectRoot = path.join(__dirname, '..');

  try {
    console.log(`\n🧪 Testing challenge: ${challengeId}`);

    // Run vitest from project root, but specify the test file
    // The relative imports in testCases will work because code.ts and solution.ts
    // are in the same directory as the test file
    const testFile = path.relative(projectRoot, path.join(testDir, 'challenge.test.ts'));

    const result = execSync(
      `npx vitest run ${testFile} --config vitest.config.mts`,
      {
        cwd: projectRoot,
        stdio: 'inherit',
        encoding: 'utf-8',
      }
    );

    console.log(`✅ Challenge ${challengeId} passed all tests\n`);
    return true;
  } catch (error) {
    console.error(`❌ Challenge ${challengeId} failed tests\n`);
    return false;
  }
}

// Main function
function main() {
  const filesArg = process.argv[2];

  if (!filesArg || filesArg.trim() === '') {
    console.log('No challenge files to validate');
    return;
  }

  const challengeFiles = filesArg
    .split(/\s+/) // Split by whitespace (spaces, newlines, tabs)
    .map(f => f.trim())
    .filter(f => f && f.endsWith('.ts') && !f.endsWith('index.ts'))
    .map(f => {
      // Handle both relative and absolute paths
      if (path.isAbsolute(f)) {
        return f;
      }
      return path.join(__dirname, '..', f);
    });

  if (challengeFiles.length === 0) {
    console.log('No valid challenge files to validate');
    return;
  }

  console.log(`Validating ${challengeFiles.length} challenge file(s)...\n`);

  // Clean up any existing temp directory
  cleanup();
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  let allPassed = true;
  const results = [];

  for (const challengeFile of challengeFiles) {
    if (!fs.existsSync(challengeFile)) {
      console.warn(`⚠️  File not found: ${challengeFile}`);
      continue;
    }

    try {
      const { solution, testCases } = extractChallengeData(challengeFile);
      const testDir = createTestFiles(challengeFile, solution, testCases);
      const passed = runTests(testDir, challengeFile);

      results.push({ file: challengeFile, passed });
      if (!passed) {
        allPassed = false;
      }
    } catch (error) {
      console.error(`❌ Error validating ${challengeFile}:`, error.message);
      results.push({ file: challengeFile, passed: false, error: error.message });
      allPassed = false;
    }
  }

  // Cleanup
  cleanup();

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Validation Summary');
  console.log('='.repeat(60));

  for (const result of results) {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    const fileName = path.basename(result.file);
    console.log(`${status} - ${fileName}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }

  console.log('='.repeat(60));

  if (!allPassed) {
    console.error('\n❌ Some challenges failed validation. Please fix the solutions.');
    process.exit(1);
  } else {
    console.log('\n✅ All challenges passed validation!');
    process.exit(0);
  }
}

// Run main function
main();
