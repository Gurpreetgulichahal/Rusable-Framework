const { test } = require('../test.setup');
const testData = require('../data/testData.json');

test.describe('Settings Tests', () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.navigate();
  });

  test('should update settings successfully', async ({ settingsPage }) => {
    const darkMode = true;
    const notifications = false;
    const language = testData.settingsData.languages[1]; // Spanish
    
    await settingsPage.updateSettings(darkMode, notifications, language);
    const isUpdated = await settingsPage.areSettingsUpdated();
    const successMessage = await settingsPage.getSuccessMessage();
    
    expect(isUpdated).toBeTruthy();
    expect(successMessage).toContain(testData.settingsData.expectedMessages.success);
    
    // Verify settings were actually updated
    expect(await settingsPage.isDarkModeEnabled()).toBe(darkMode);
    expect(await settingsPage.areNotificationsEnabled()).toBe(notifications);
    expect(await settingsPage.getSelectedLanguage()).toBe(language);
  });

  test('should toggle dark mode', async ({ settingsPage }) => {
    const initialDarkMode = await settingsPage.isDarkModeEnabled();
    
    await settingsPage.toggleDarkMode();
    const newDarkMode = await settingsPage.isDarkModeEnabled();
    
    expect(newDarkMode).toBe(!initialDarkMode);
  });

  test('should toggle notifications', async ({ settingsPage }) => {
    const initialNotifications = await settingsPage.areNotificationsEnabled();
    
    await settingsPage.toggleNotifications();
    const newNotifications = await settingsPage.areNotificationsEnabled();
    
    expect(newNotifications).toBe(!initialNotifications);
  });

  test('should change language', async ({ settingsPage }) => {
    const newLanguage = testData.settingsData.languages[2]; // French
    
    await settingsPage.selectLanguage(newLanguage);
    await settingsPage.saveSettings();
    
    expect(await settingsPage.getSelectedLanguage()).toBe(newLanguage);
  });
}); 