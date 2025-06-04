class FooterComponent {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.footerLinks = 'footer a';
    this.versionNumber = 'footer .version';
    this.termsLink = 'footer a[href="/terms"]';
    this.privacyLink = 'footer a[href="/privacy"]';
    this.contactLink = 'footer a[href="/contact"]';
  }

  async getVersionNumber() {
    return await this.page.textContent(this.versionNumber);
  }

  async getAllFooterLinks() {
    return await this.page.$$eval(this.footerLinks, links => 
      links.map(link => ({
        text: link.textContent,
        href: link.href
      }))
    );
  }

  async clickTermsLink() {
    await this.page.click(this.termsLink);
  }

  async clickPrivacyLink() {
    await this.page.click(this.privacyLink);
  }

  async clickContactLink() {
    await this.page.click(this.contactLink);
  }
}

module.exports = { FooterComponent }; 