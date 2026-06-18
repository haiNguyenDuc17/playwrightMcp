import { test, expect } from '@playwright/test';

test.use({ channel: 'chrome' });

test('Add 3 tasks and check off the first one as completed', async ({ page }) => {
  test.setTimeout(60000);

  // Navigate to the Playwright TodoMVC demo app
  await page.goto('https://demo.playwright.dev/todomvc', { waitUntil: 'domcontentloaded' });
  console.log('✓ Navigated to https://demo.playwright.dev/todomvc');

  const input = page.getByPlaceholder('What needs to be done?');

  // Add task 1
  await input.fill('Buy groceries');
  await input.press('Enter');
  console.log('✓ Added task 1: Buy groceries');

  // Add task 2
  await input.fill('Write unit tests');
  await input.press('Enter');
  console.log('✓ Added task 2: Write unit tests');

  // Add task 3
  await input.fill('Deploy to production');
  await input.press('Enter');
  console.log('✓ Added task 3: Deploy to production');

  // Verify all 3 tasks are visible
  await expect(page.getByText('Buy groceries')).toBeVisible();
  await expect(page.getByText('Write unit tests')).toBeVisible();
  await expect(page.getByText('Deploy to production')).toBeVisible();
  console.log('✓ All 3 tasks are visible');

  // Check off the first task ("Buy groceries") as completed
  await page.getByRole('listitem').filter({ hasText: 'Buy groceries' }).getByRole('checkbox').check();
  console.log('✓ Checked off "Buy groceries" as completed');

  // Verify the first task is marked as completed
  const firstTask = page.getByRole('listitem').filter({ hasText: 'Buy groceries' });
  await expect(firstTask).toHaveClass(/completed/);
  console.log('✓ Verified "Buy groceries" is marked as completed');

  // Verify remaining tasks counter shows 2 items left
  await expect(page.getByText(/2 items? left/i)).toBeVisible();
  console.log('✓ Verified 2 items remaining');
});
