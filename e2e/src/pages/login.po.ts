import {browser, by, element} from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}/login`) as Promise<any>;
  }

  async login() {
    await element(by.css('#input-email')).sendKeys("test@example.com")
    await element(by.css('#input-password')).sendKeys("12345678")

    return element(by.css('nb-login button')).click() as Promise<void>;
  }
}
