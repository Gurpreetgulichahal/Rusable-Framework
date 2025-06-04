class SignupPage {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.nameInput = '#name';
    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.confirmPasswordInput = '#confirmPassword';
    this.submitButton = '#signup-button';
    this.successMessage = '.success-message';
    this.errorMessage = '.error-message';
  }

  async navigate() {
    await this.page.goto('/signup');
  }

  async fillSignupForm(name, email, password, confirmPassword) {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, confirmPassword);
  }

  async submitForm() {
    await this.page.click(this.submitButton);
  }

  async signup(name, email, password, confirmPassword) {
    await this.fillSignupForm(name, email, password, confirmPassword);
    await this.submitForm();
  }

  async getSuccessMessage() {
    return await this.page.textContent(this.successMessage);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async isSignupSuccessful() {
    return await this.page.isVisible(this.successMessage);
  }
}

module.exports = { SignupPage }; 