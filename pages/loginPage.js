class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '.error-message';
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async isLoggedIn() {
    return await this.page.isVisible('.dashboard');
  }
}

module.exports = { LoginPage }; 