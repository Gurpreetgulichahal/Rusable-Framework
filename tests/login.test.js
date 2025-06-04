const { test } = require('../test.setup');
const testData = require('../data/testData.json');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ loginPage }) => {
    const { username, password } = testData.validUser;
    
    await loginPage.login(username, password);
    const isLoggedIn = await loginPage.isLoggedIn();
    
    expect(isLoggedIn).toBeTruthy();
  });

  test('should show error message with invalid credentials', async ({ loginPage }) => {
    const { username, password } = testData.invalidUser;
    
    await loginPage.login(username, password);
    const errorMessage = await loginPage.getErrorMessage();
    
    expect(errorMessage).toContain(testData.testData.expectedErrorMessage);
  });
}); 