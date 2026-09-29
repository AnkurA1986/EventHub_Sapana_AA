const { test, expect } = require('@playwright/test');
const { loginWithTestUser } = require('../Utill/AuthHelper');
const { POManager } = require('../PageObjectModel/POManager');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test.beforeEach(async ({ page }) => {
  await loginWithTestUser(page, dataset);
});

test('Events page lists upcoming events', async ({ page }) => {
  const poManager = new POManager(page);

  await page.goto('/events');
  await poManager.getEventsPage().verifyEventsPage();
  await expect(page.getByRole('link', { name: dataset.eventName }).first()).toBeVisible();
});

test('Search and open event details', async ({ page }) => {
  const poManager = new POManager(page);
  const eventsPage = poManager.getEventsPage();

  await page.goto('/events');
  await eventsPage.searchEvent(dataset.eventName);
  await eventsPage.openEvent(dataset.eventName);
  await poManager.getEventDetailsPage().verifyEvent(dataset.eventName);
});

test('Create new event and verify on Events page', async ({ page }) => {
  const poManager = new POManager(page);
  const manageEventsPage = poManager.getManageEventsPage();
  const eventsPage = poManager.getEventsPage();
  const eventTitle = `${dataset.newEvent.title} ${Date.now()}`;

  await manageEventsPage.goTo();
  await manageEventsPage.addEvent({
    ...dataset.newEvent,
    title: eventTitle,
  });
  await manageEventsPage.expectEventInAdminList(eventTitle);

  await page.goto('/events');
  await eventsPage.verifyEventsPage();
  await eventsPage.searchEvent(eventTitle);
  await eventsPage.expectEventListed(eventTitle);
  await eventsPage.openEvent(eventTitle);
  await poManager.getEventDetailsPage().verifyEvent(eventTitle);
});
