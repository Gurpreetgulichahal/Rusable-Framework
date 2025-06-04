const { test as base } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage');
const { SignupPage } = require('./pages/signupPage');
const { DashboardPage } = require('./pages/dashboardPage');
const { ProfilePage } = require('./pages/profilePage');
const { SettingsPage } = require('./pages/settingsPage');
const { HeaderComponent } = require('./components/headerComponent');
const { FooterComponent } = require('./components/footerComponent');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },
  header: async ({ page }, use) => {
    const header = new HeaderComponent(page);
    await use(header);
  },
  footer: async ({ page }, use) => {
    const footer = new FooterComponent(page);
    await use(footer);
  }
});

test.beforeEach(async ({ page }) => {
  await page.setDefaultTimeout(30000);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `./test-results/screenshots/${testInfo.title}-${Date.now()}.png`,
      fullPage: true
    });
  }
});

module.exports = { test }; 