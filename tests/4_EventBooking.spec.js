const { test } = require('@playwright/test');
const { loginWithTestUser } = require('../Utill/AuthHelper');
const { POManager } = require('../PageObjectModel/POManager');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test('Book tickets for an event', async ({ page }) => {
  await loginWithTestUser(page, dataset);
  const poManager = new POManager(page);

  await page.goto('/events');
  await poManager.getEventsPage().openEvent(dataset.eventName);
  await poManager.getEventDetailsPage().verifyEvent(dataset.eventName);
  await poManager.getEventDetailsPage().bookTicket(
    dataset.customerName,
    dataset.email,
    dataset.phone,
  );

  await poManager.getHomePage().goToBookings();
  await poManager.getBookingsPage().expectBookingForEvent(dataset.eventName);
});
