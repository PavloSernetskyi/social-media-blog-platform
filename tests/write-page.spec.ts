import { test, expect } from '@playwright/test';

test('can fill and submit the write post form', async ({ page }) => {
  // Change the URL if your dev server runs on a different port
  await page.goto('http://localhost:3000/write');

  // Fill the form fields
  await page.fill('input[name="title"]', 'Test Post Title');
  await page.fill('input[name="authorName"]', 'Test Author');
  await page.fill('textarea[name="content"]', 'This is a test post content.');


  // Submit the form
  await page.click('button[type="submit"]');

  // Expect an alert to appear
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Post created');
    await dialog.dismiss();
  });
});