class DashboardPage {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.greetingMessage = '.greeting-message';
    this.statsContainer = '.stats-container';
    this.statCards = '.stat-card';
    this.welcomeMessage = '.welcome-message';
    this.quickActions = '.quick-actions';
  }

  async navigate() {
    await this.page.goto('/dashboard');
  }

  async getGreetingMessage() {
    return await this.page.textContent(this.greetingMessage);
  }

  async getWelcomeMessage() {
    return await this.page.textContent(this.welcomeMessage);
  }

  async getStats() {
    return await this.page.$$eval(this.statCards, cards => 
      cards.map(card => ({
        title: card.querySelector('.title').textContent,
        value: card.querySelector('.value').textContent
      }))
    );
  }

  async getQuickActions() {
    return await this.page.$$eval(this.quickActions + ' button', buttons => 
      buttons.map(button => button.textContent)
    );
  }

  async isDashboardLoaded() {
    return await this.page.isVisible(this.statsContainer);
  }
}

module.exports = { DashboardPage }; 