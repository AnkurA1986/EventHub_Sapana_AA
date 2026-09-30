const { test } = require('@playwright/test');
const { POManager } = require('../PageObjectModel/POManager');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test('Register page shows validation when fields are blank', async ({ page }) => {
  const registerPage = new POManager(page).getRegisterPage();

  await registerPage.goTo();
  await registerPage.submitEmptyForm();
  await registerPage.verifyBlankFieldValidationMessages();
});

test('Register shows error for already existing account', async ({ page }) => {
  const registerPage = new POManager(page).getRegisterPage();

  await registerPage.goTo();
  await registerPage.attemptRegister(dataset.email, dataset.password);
  await registerPage.verifyExistingAccountError();
});

test('Register a new sandbox user', async ({ page }) => {
  const registerPage = new POManager(page).getRegisterPage();
  const email = `playwright.${Date.now()}@example.com`;
  const password = 'Test@1234';

  await registerPage.goTo();
  const redirectedUrl = await registerPage.register(email, password);
  console.log(`Captured URL in test: ${redirectedUrl}`);
});
