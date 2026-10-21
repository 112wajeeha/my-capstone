
import { test, expect } from '@playwright/test';

test('homepage loads successfully and displays content', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('body')).not.toBeEmpty();
  await expect(page.getByText(/briefly/i).first()).toBeVisible();
});

test('navigation links open their correct pages', async ({ page }) => {
  const routes = [
    { label: 'Dashboard', url: '/' },
    { label: 'New Meeting', url: '/new' },
    { label: 'Actions', url: '/actions' },
    { label: 'Settings', url: '/settings' },
  ];

  for (const route of routes) {
    await page.goto('/');

    await page.getByRole('link', { name: route.label, exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`${route.url.replace('/', '\\/')}$`));
  }
});

test('New Meeting page displays its heading and notes section', async ({ page }) => {
  await page.goto('/new');

  await expect(
    page.getByRole('heading', { name: 'Add a meeting' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Meeting notes' })
  ).toBeVisible();

  await expect(
    page.getByText('The meeting input form will be added in a later step.')
  ).toBeVisible();
});

test('Actions page displays a helpful empty state', async ({ page }) => {
  await page.goto('/actions');

  await expect(
    page.getByRole('heading', { name: 'Your action items' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'No action items yet' })
  ).toBeVisible();

  await expect(
    page.getByText('Add a meeting to start building your follow-up list.')
  ).toBeVisible();
});

test('Settings page displays workspace settings', async ({ page }) => {
  await page.goto('/settings');

  await expect(
    page.getByRole('heading', { name: 'Settings', exact: true })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Workspace settings' })
  ).toBeVisible();

  await expect(
    page.getByText('Settings will be added in a later step.')
  ).toBeVisible();
});

test("meeting chat shows a designed error when the API fails", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Mocked test error" }),
    });
  });

  await page.goto("/meeting/test-meeting");

  const input = page.getByPlaceholder("Ask a follow-up question...");
  const send = page.getByRole("button", { name: "Send" });

  // Retry fill until React state has caught up and Send is enabled
  await expect(async () => {
    await input.fill("Summarize the meeting");
    await expect(send).toBeEnabled({ timeout: 1000 });
  }).toPass({ timeout: 10_000 });

  await send.click();

  // Narrow to our alert; Next.js also renders its own role="alert" route announcer
  const alert = page.getByRole("alert").filter({
    hasText: "Something went wrong while sending your message.",
  });

  await expect(alert).toBeVisible();
  await expect(alert.getByRole("button", { name: "Retry" })).toBeVisible();
});