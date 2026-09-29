const { test, expect } = require('@playwright/test');
const { POManager } = require('../PageObjectModel/POManager');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test('EventHub valid login', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(dataset.email, dataset.password);

  const homePage = poManager.getHomePage();
  await homePage.verifyHomePage();
});

test('EventHub invalid login', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.invalidLogin(dataset.invalidEmail, dataset.invalidPassword);
  await expect(loginPage.errorMessage).toBeVisible();
});
