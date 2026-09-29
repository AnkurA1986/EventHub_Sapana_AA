const { LoginPage } = require('./LoginPage');
const { RegisterPage } = require('./RegisterPage');
const { HomePage } = require('./HomePage');
const { EventsPage } = require('./EventsPage');
const { EventDetailsPage } = require('./EventDetailsPage');
const { BookingsPage } = require('./BookingsPage');
const { ManageEventsPage } = require('./ManageEventsPage');
const { FooterPage } = require('./FooterPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.homePage = new HomePage(this.page);
    this.eventsPage = new EventsPage(this.page);
    this.eventDetailsPage = new EventDetailsPage(this.page);
    this.bookingsPage = new BookingsPage(this.page);
    this.manageEventsPage = new ManageEventsPage(this.page);
    this.footerPage = new FooterPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getRegisterPage() {
    return this.registerPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getEventsPage() {
    return this.eventsPage;
  }

  getEventDetailsPage() {
    return this.eventDetailsPage;
  }

  getBookingsPage() {
    return this.bookingsPage;
  }

  getManageEventsPage() {
    return this.manageEventsPage;
  }

  getFooterPage() {
    return this.footerPage;
  }
}

module.exports = { POManager };
