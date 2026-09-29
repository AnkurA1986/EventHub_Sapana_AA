const { expect } = require('@playwright/test');

class EventsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Upcoming Events' });
    this.searchBox = page.getByPlaceholder(/Search events/);
    this.categoryDropdown = page.locator('select').nth(0);
    this.cityDropdown = page.locator('select').nth(1);
  }

  async verifyEventsPage() {
    await expect(this.heading).toBeVisible();
  }

  async searchEvent(eventName) {
    await this.searchBox.fill(eventName);
  }

  async filterByCategory(category) {
    await this.categoryDropdown.selectOption({ label: category });
  }

  async openEvent(eventName) {
    await this.page.getByRole('link', { name: eventName }).first().click();
  }

  async expectEventListed(eventName) {
    await expect(this.page.getByRole('link', { name: eventName }).first()).toBeVisible();
  }
}

module.exports = { EventsPage };
