class SettingsPage {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.darkModeToggle = '#dark-mode-toggle';
    this.notificationsToggle = '#notifications-toggle';
    this.languageDropdown = '#language-select';
    this.saveButton = '#save-settings';
    this.successMessage = '.success-message';
    this.errorMessage = '.error-message';
  }

  async navigate() {
    await this.page.goto('/settings');
  }

  async toggleDarkMode() {
    await this.page.click(this.darkModeToggle);
  }

  async toggleNotifications() {
    await this.page.click(this.notificationsToggle);
  }

  async selectLanguage(language) {
    await this.page.selectOption(this.languageDropdown, language);
  }

  async saveSettings() {
    await this.page.click(this.saveButton);
  }

  async updateSettings(darkMode, notifications, language) {
    const currentDarkMode = await this.isDarkModeEnabled();
    const currentNotifications = await this.areNotificationsEnabled();
    
    if (darkMode !== currentDarkMode) {
      await this.toggleDarkMode();
    }
    
    if (notifications !== currentNotifications) {
      await this.toggleNotifications();
    }
    
    await this.selectLanguage(language);
    await this.saveSettings();
  }

  async isDarkModeEnabled() {
    return await this.page.isChecked(this.darkModeToggle);
  }

  async areNotificationsEnabled() {
    return await this.page.isChecked(this.notificationsToggle);
  }

  async getSelectedLanguage() {
    return await this.page.inputValue(this.languageDropdown);
  }

  async getSuccessMessage() {
    return await this.page.textContent(this.successMessage);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async areSettingsUpdated() {
    return await this.page.isVisible(this.successMessage);
  }
}

module.exports = { SettingsPage }; 