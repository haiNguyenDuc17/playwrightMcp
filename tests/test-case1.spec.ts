import { test, expect } from '@playwright/test';

test.use({ channel: 'chrome' });

test('Test case 1: open ToolsQA and verify page displays', async ({ page }) => {
  test.setTimeout(60000);

  // Step 1: Go to https://www.toolsqa.com/
  await page.goto('https://www.toolsqa.com/', { waitUntil: 'domcontentloaded' });
  console.log('✓ Step 1: Navigated to ToolsQA');

  // Step 2: Wait for 5s
  await page.waitForTimeout(5000);
  console.log('✓ Step 2: Waited for 5 seconds');

  // Step 3: Verify that the page displays
  await expect(page).toHaveURL(/toolsqa\.com/i);
  await expect(page.locator('body')).toBeVisible();
  console.log('✓ Step 3: Verified page is displayed');
});
