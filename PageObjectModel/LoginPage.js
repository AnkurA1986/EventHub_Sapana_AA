class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.signInButton = page.locator('#login-btn');
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.errorMessage = page.getByText('Invalid email or password');
  }

  async goTo() {
    await this.page.goto('/login');
  }

  async validLogin(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForURL('**/');
  }

  async invalidLogin(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { LoginPage };
