const { expect } = require('@playwright/test');

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('#register-email');
    this.password = page.locator('#register-password');
    this.confirmPassword = page.getByPlaceholder('Repeat your password');
    this.createAccountButton = page.locator('#register-btn');
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.emailValidationMessage = page.getByText('Enter a valid email');
    this.passwordValidationMessage = page.getByText('Password does not meet the requirements below');
  }

  async goTo() {
    await this.page.goto('/register');
  }

  async register(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.createAccountButton.click();
    await this.page.waitForURL((url) => !url.pathname.includes('/register'));
    await expect(this.page).toHaveURL('/');
    await expect(this.page.getByRole('heading', { name: 'Diover & Book Amazing Events' }),
    ).toBeVisible();

    const registeredUrl = this.page.url();
    console.log(`Successfully registered. Redirected URL: ${registeredUrl}`);
    return registeredUrl;
  }

  async submitEmptyForm() {
    await this.createAccountButton.click();
  }

  async verifyBlankFieldValidationMessages() {
    await expect(this.emailValidationMessage).toBeVisible();
    await expect(this.passwordValidationMessage).toBeVisible();
    await expect(this.page).toHaveURL(/\/register$/);
  }
}

module.exports = { RegisterPage };
