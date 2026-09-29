const { test, expect } = require('@playwright/test');
const { loginWithTestUser } = require('../Utill/AuthHelper');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test('My Bookings page opens from navigation', async ({ page }) => {
  const poManager = await loginWithTestUser(page, dataset);

  await poManager.getHomePage().goToBookings();
  await poManager.getBookingsPage().verifyBookingsPage();
  await expect(page.getByRole('button', { name: 'Clear all bookings' })).toBeVisible();
});
