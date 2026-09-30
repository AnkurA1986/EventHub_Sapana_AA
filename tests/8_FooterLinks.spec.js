const { test } = require('@playwright/test');
const { loginWithTestUser } = require('../Utill/AuthHelper');
const dataset = JSON.parse(JSON.stringify(require('../Utill/TestData.json')));

test('Popular Courses footer links are not broken', async ({ page }) => {
  const poManager = await loginWithTestUser(page, dataset);
  await poManager.getHomePage().verifyHomePage();

  const footerPage = poManager.getFooterPage();
  await footerPage.verifyPopularCoursesLinksNotBroken();
});
