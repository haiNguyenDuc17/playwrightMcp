# Playwright Project — Agent Instructions

## Project Overview

Minimal Playwright test project that automates browser scenarios defined in `test_cases/` markdown files and runs them via the installed system Chrome browser.

## Running Tests

```bash
# Run a specific spec (no playwright.config.ts — defaults apply)
npx playwright test tests/<spec>.spec.ts --headed

# There is no playwright.config.ts — do NOT use --project flags
# Browser is fixed to Chrome via test.use({ channel: 'chrome' }) inside each spec
```

> `npx` requires a valid npm registry connection. If you see `E401`, run:
> ```bash
> $env:NPM_CONFIG_USERCONFIG='NUL'; npx playwright test tests/<spec>.spec.ts --headed
> ```

## Test File Conventions

Each test spec maps to a markdown scenario in `test_cases/` or `test_data/`. Follow these patterns precisely:

| Convention | Pattern |
|---|---|
| Import | `import { test, expect } from '@playwright/test';` |
| Browser | `test.use({ channel: 'chrome' });` at file scope |
| Timeout | `test.setTimeout(60000);` inside each test |
| Navigation | `page.goto(url, { waitUntil: 'domcontentloaded' })` |
| Sleep | `await page.waitForTimeout(ms);` |
| Step logging | `console.log('✓ Step N: description');` |
| URL assertion | `await expect(page).toHaveURL(/regex/i);` |
| Visibility | `await expect(page.locator('...')).toBeVisible();` |
| Text match | `await expect(page.getByText('...', { exact: false })).toBeVisible();` |
| Role click | `await page.getByRole('link', { name: /pattern/i }).first().click();` |

## Implementing a New Test from a Markdown File

1. Read the `.md` file in `test_cases/` or `test_data/` to get the numbered steps
2. Create `tests/<descriptive-name>.spec.ts`
3. Map each step directly: navigation → `goto`, sleep → `waitForTimeout`, verify text → `getByText`, verify URL → `toHaveURL`
4. Run headlessly to validate: `npx playwright test tests/<file>.spec.ts --headed`

## Key Files

- `tests/test-case1.spec.ts` — reference example of a complete spec
- `test_cases/test1.md` — example scenario file showing expected format
- `.gitignore` — excludes `node_modules/`, all report folders

## Known Environment Constraints

- **No `playwright.config.ts`** — do not add `--project=chromium`; it will fail
- **Playwright browser download blocked** (TLS cert issue) — always use `channel: 'chrome'` and never call `npx playwright install`
- **npm auth (`E401`)** may occur with `npx`; use the `NPM_CONFIG_USERCONFIG=NUL` workaround above
