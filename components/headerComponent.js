class HeaderComponent {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.homeLink = 'nav a[href="/"]';
    this.profileLink = 'nav a[href="/profile"]';
    this.settingsLink = 'nav a[href="/settings"]';
    this.logoutButton = 'nav button.logout';
    this.userAvatar = 'nav .user-avatar';
  }

  async navigateToHome() {
    await this.page.click(this.homeLink);
  }

  async navigateToProfile() {
    await this.page.click(this.profileLink);
  }

  async navigateToSettings() {
    await this.page.click(this.settingsLink);
  }

  async logout() {
    await this.page.click(this.logoutButton);
  }

  async isLoggedIn() {
    return await this.page.isVisible(this.userAvatar);
  }
}

module.exports = { HeaderComponent }; 