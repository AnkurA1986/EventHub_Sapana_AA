const { expect } = require('@playwright/test');

class FooterPage {
  constructor(page) {
    this.page = page;
    this.popularCoursesHeading = page.getByRole('heading', { name: 'Popular Courses' });
    this.popularCoursesLinks = this.popularCoursesHeading.locator('..').getByRole('link');
  }

  async verifyPopularCoursesLinksNotBroken() {
    await this.popularCoursesHeading.scrollIntoViewIfNeeded();
    await expect(this.popularCoursesHeading).toBeVisible();

    const linkCount = await this.popularCoursesLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    for (let i = 0; i < linkCount; i++) {
      const link = this.popularCoursesLinks.nth(i);
      const linkText = (await link.innerText()).trim();
      const href = await link.getAttribute('href');

      expect(href, `Link "${linkText}" is missing href`).toBeTruthy();

      const response = await this.page.request.get(href);
      expect(
        response.status(),
        `Broken link "${linkText}" (${href}) returned HTTP ${response.status()}`
      ).toBeLessThan(400);

      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        link.click(),
      ]);

      await newPage.waitForLoadState('domcontentloaded');
      expect(
        newPage.url(),
        `Link "${linkText}" did not open a valid page`
      ).toContain(new URL(href).hostname);

      await newPage.close();
    }
  }
}

module.exports = { FooterPage };
