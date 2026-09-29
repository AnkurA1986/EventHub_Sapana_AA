const { POManager } = require('../PageObjectModel/POManager');

async function loginWithTestUser(page, credentials) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(credentials.email, credentials.password);

  return poManager;
}

module.exports = { loginWithTestUser };
