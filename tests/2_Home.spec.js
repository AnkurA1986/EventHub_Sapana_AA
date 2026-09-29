const { test } = require('@playwright/test');
const { loginWithTestUser } = require('../Utill/AuthHelper');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test('Home page loads after login', async ({ page }) => {
  const poManager = await loginWithTestUser(page, dataset);
  await poManager.getHomePage().verifyHomePage();
});

test('Navigate from home to events and bookings', async ({ page }) => {
  const poManager = await loginWithTestUser(page, dataset);
  const homePage = poManager.getHomePage();

  await homePage.goToEvents();
  await poManager.getEventsPage().verifyEventsPage();

  await homePage.goToBookings();
  await poManager.getBookingsPage().verifyBookingsPage();
});
