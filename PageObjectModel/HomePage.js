const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Discover & Book Amazing Events' });
    this.eventsLink = page.locator('#nav-events');
    this.bookingsLink = page.locator('#nav-bookings');
    this.logoutButton = page.locator('#logout-btn');
  }

  async verifyHomePage() {
    await expect(this.heading).toBeVisible();
  }

  async goToEvents() {
    await this.eventsLink.click();
    await this.page.waitForURL('**/events');
  }

  async goToBookings() {
    await this.bookingsLink.click();
    await this.page.waitForURL('**/bookings');
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.waitForURL('**/login');
  }
}

module.exports = { HomePage };
