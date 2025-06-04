class ProfilePage {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.nameInput = '#profile-name';
    this.emailInput = '#profile-email';
    this.phoneInput = '#profile-phone';
    this.saveButton = '#save-profile';
    this.successMessage = '.success-message';
    this.errorMessage = '.error-message';
    this.profilePicture = '.profile-picture';
    this.uploadPictureButton = '#upload-picture';
  }

  async navigate() {
    await this.page.goto('/profile');
  }

  async updateProfile(name, email, phone) {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.phoneInput, phone);
    await this.page.click(this.saveButton);
  }

  async getCurrentProfileData() {
    return {
      name: await this.page.inputValue(this.nameInput),
      email: await this.page.inputValue(this.emailInput),
      phone: await this.page.inputValue(this.phoneInput)
    };
  }

  async uploadProfilePicture(filePath) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.click(this.uploadPictureButton);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async getSuccessMessage() {
    return await this.page.textContent(this.successMessage);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async isProfileUpdated() {
    return await this.page.isVisible(this.successMessage);
  }
}

module.exports = { ProfilePage }; 