const { expect } = require('@playwright/test');

class ManageEventsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('#event-title-input');
    this.description = page.getByPlaceholder('Describe the event…');
    this.category = page.locator('#category');
    this.city = page.locator('#city');
    this.venue = page.locator('#venue');
    this.eventDateTime = page.locator('input[type="datetime-local"]');
    this.price = page.getByLabel('Price ($)');
    this.totalSeats = page.getByLabel('Total Seats');
    this.addEventButton = page.locator('#add-event-btn');
  }

  async verifyManageEventsPage() {
    await expect(this.page.getByRole('heading', { name: '+ New Event' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'All Events' })).toBeVisible();
  }

  async goTo() {
    await this.page.goto('/admin/events');
  }

  async addEvent(event) {
    await this.title.fill(event.title);
    await this.description.fill(event.description);
    await this.category.selectOption({ label: event.category });
    await this.city.fill(event.city);
    await this.venue.fill(event.venue);
    await this.eventDateTime.fill(event.dateTime);
    await this.price.fill(String(event.price));
    await this.totalSeats.fill(String(event.totalSeats));
    await this.addEventButton.click();
  }

  async expectEventInAdminList(eventTitle) {
    await expect(this.page.getByText(eventTitle).first()).toBeVisible();
  }
}

module.exports = { ManageEventsPage };
