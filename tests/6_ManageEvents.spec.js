const { test, expect } = require('@playwright/test');
const { loginWithTestUser } = require('../Utill/AuthHelper');
const { POManager } = require('../PageObjectModel/POManager');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test.beforeEach(async ({ page }) => {
  await loginWithTestUser(page, dataset);
});

test('Manage Events admin page loads', async ({ page }) => {
  const poManager = new POManager(page);
  const manageEventsPage = poManager.getManageEventsPage();

  await manageEventsPage.goTo();
  await manageEventsPage.verifyManageEventsPage();
});

test('Create a new event from admin', async ({ page }) => {
  const poManager = new POManager(page);
  const manageEventsPage = poManager.getManageEventsPage();
  const uniqueTitle = `${dataset.newEvent.title} ${Date.now()}`;

  await manageEventsPage.goTo();
  await manageEventsPage.addEvent({
    ...dataset.newEvent,
    title: uniqueTitle,
  });

  await expect(page.getByText(uniqueTitle).first()).toBeVisible();
});
