const { test } = require('../test.setup');
const testData = require('../data/testData.json');

test.describe('Signup Tests', () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.navigate();
  });

  test('should signup successfully with valid credentials', async ({ signupPage }) => {
    const { name, email, password, confirmPassword } = testData.signupData.validUser;
    
    await signupPage.signup(name, email, password, confirmPassword);
    const isSuccessful = await signupPage.isSignupSuccessful();
    const successMessage = await signupPage.getSuccessMessage();
    
    expect(isSuccessful).toBeTruthy();
    expect(successMessage).toContain(testData.signupData.expectedMessages.success);
  });

  test('should show error message with invalid email', async ({ signupPage }) => {
    const { name, email, password, confirmPassword } = testData.signupData.invalidUser;
    
    await signupPage.signup(name, email, password, confirmPassword);
    const errorMessage = await signupPage.getErrorMessage();
    
    expect(errorMessage).toContain(testData.signupData.expectedMessages.emailError);
  });

  test('should show error message with password mismatch', async ({ signupPage }) => {
    const { name, email, password } = testData.signupData.validUser;
    const confirmPassword = 'DifferentPassword123';
    
    await signupPage.signup(name, email, password, confirmPassword);
    const errorMessage = await signupPage.getErrorMessage();
    
    expect(errorMessage).toContain(testData.signupData.expectedMessages.passwordMismatch);
  });
}); 