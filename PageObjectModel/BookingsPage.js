const { expect } = require('@playwright/test');

class BookingsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'My Bookings' });
  }

  async verifyBookingsPage() {
    await expect(this.heading).toBeVisible();
  }

  async expectBookingForEvent(eventName) {
    await expect(this.page.getByText(eventName).first()).toBeVisible();
  }
}

module.exports = { BookingsPage };
