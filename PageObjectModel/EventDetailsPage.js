const { expect } = require('@playwright/test');

class EventDetailsPage {
  constructor(page) {
    this.page = page;
    this.customerName = page.locator('#customerName');
    this.customerEmail = page.locator('#customer-email');
    this.phone = page.locator('#phone');
    this.confirmBookingButton = page.locator('#confirm-booking');
  }

  async verifyEvent(eventName) {
    await expect(this.page.getByRole('heading', { name: eventName })).toBeVisible();
  }

  async bookTicket(name, email, phone) {
    await this.customerName.fill(name);
    await this.customerEmail.fill(email);
    await this.phone.fill(phone);
    await this.confirmBookingButton.click();
  }
}

module.exports = { EventDetailsPage };
