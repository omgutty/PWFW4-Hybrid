import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file from the config directory
dotenv.config({ path: path.resolve(__dirname, 'config/.env') });

// ─── Environment resolution (Fix for Issues #9 and #10) ────────────────────

// ENV is a pointer to a key in process.env, not the URL itself.
// Running `cross-env ENV=STAG npx playwright test` points at the STAG URL.
const envKey: string = process.env['ENV'] ?? 'QAENV';
const baseURL: string | undefined = process.env[envKey];

// Fail fast with a clear error instead of cryptic "navigation to undefined" failures
if (!baseURL) {
  throw new Error(
    `\n[Config Error] ENV="${envKey}" but process.env.${envKey} is not defined.\n` +
    `Check your config/.env file.\n` +
    `Expected keys: QAENV, STAG, PROD\n` +
    `Current ENV value: "${process.env['ENV'] ?? '(not set, defaulting to QAENV)'}"\n`
  );
}

console.log(`\n▶  Target environment : ${envKey}`);
console.log(`▶  Base URL           : ${baseURL}\n`);

// ─── Config ────────────────────────────────────────────────────────────────

export default defineConfig({
  testDir: './tests',

  // Run test files in parallel (each file gets its own worker)
  fullyParallel: true,

  // Prevent accidental test.only commits from passing CI
  forbidOnly: !!process.env['CI'],

  // Retry failed tests — only on CI, not locally (local retries hide flakiness)
  retries: process.env['CI'] ? 2 : 0,

  // Workers: let Playwright decide locally; 1 on CI to avoid resource contention
  workers: process.env['CI'] ? 1 : undefined,

  // Dual reporting: allure for trend analysis, html for quick local review
  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-results',
      suiteTitle:   'Automation Test Report',
    }],
    ['html', { open: 'never' }],
    ['list'],  // shows test names in terminal as they run
  ],

  use: {
    baseURL,

    // Traces, screenshots, and video — only captured on failure to save disk space
    trace:      'on-first-retry',
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',

    // Default timeout for actions (click, fill, etc.)
    actionTimeout: 15_000,
  },

  // Global test timeout
  timeout: 60_000,

  // Expect timeout (for assertions)
  expect: {
    timeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});