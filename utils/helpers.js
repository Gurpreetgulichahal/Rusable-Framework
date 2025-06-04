const { expect } = require('@playwright/test');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Add console transport in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

class Helpers {
  constructor(page) {
    this.page = page;
  }

  async waitForElement(selector, timeout = 30000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
      logger.info(`Element ${selector} found`);
    } catch (error) {
      logger.error(`Element ${selector} not found: ${error.message}`);
      throw error;
    }
  }

  async clickElement(selector) {
    try {
      await this.waitForElement(selector);
      await this.page.click(selector);
      logger.info(`Clicked element ${selector}`);
    } catch (error) {
      logger.error(`Failed to click element ${selector}: ${error.message}`);
      throw error;
    }
  }

  async getText(selector) {
    try {
      await this.waitForElement(selector);
      const text = await this.page.textContent(selector);
      logger.info(`Got text from ${selector}: ${text}`);
      return text;
    } catch (error) {
      logger.error(`Failed to get text from ${selector}: ${error.message}`);
      throw error;
    }
  }

  async expectToHaveText(selector, expectedText) {
    const actualText = await this.getText(selector);
    expect(actualText).toContain(expectedText);
  }
}

module.exports = { Helpers, logger }; 