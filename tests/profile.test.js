const { test } = require('../test.setup');
const testData = require('../data/testData.json');

test.describe('Profile Tests', () => {
  test.beforeEach(async ({ profilePage }) => {
    await profilePage.navigate();
  });

  test('should update profile successfully with valid data', async ({ profilePage }) => {
    const { name, email, phone } = testData.profileData.validUpdate;
    
    await profilePage.updateProfile(name, email, phone);
    const isUpdated = await profilePage.isProfileUpdated();
    const successMessage = await profilePage.getSuccessMessage();
    
    expect(isUpdated).toBeTruthy();
    expect(successMessage).toContain(testData.profileData.expectedMessages.success);
  });

  test('should show error message with invalid email', async ({ profilePage }) => {
    const { name, email, phone } = testData.profileData.invalidUpdate;
    
    await profilePage.updateProfile(name, email, phone);
    const errorMessage = await profilePage.getErrorMessage();
    
    expect(errorMessage).toContain(testData.profileData.expectedMessages.emailError);
  });

  test('should show error message with empty name', async ({ profilePage }) => {
    const { email, phone } = testData.profileData.validUpdate;
    
    await profilePage.updateProfile('', email, phone);
    const errorMessage = await profilePage.getErrorMessage();
    
    expect(errorMessage).toContain(testData.profileData.expectedMessages.nameError);
  });

  test('should upload profile picture successfully', async ({ profilePage }) => {
    const imagePath = './test-data/profile-picture.jpg';
    
    await profilePage.uploadProfilePicture(imagePath);
    const isUpdated = await profilePage.isProfileUpdated();
    
    expect(isUpdated).toBeTruthy();
  });
}); 