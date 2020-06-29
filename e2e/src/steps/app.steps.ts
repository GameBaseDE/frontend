import {Given, Then, When} from 'cucumber';
import {expect} from 'chai';
import {LoginPage} from "../pages/login.po";
import {DashboardPage} from "../pages/dashboard.po";
import {browser} from "protractor";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

Given(/^I am on the dashboard page$/, async () => {
  dashboardPage = new DashboardPage();
  await dashboardPage.navigateTo();
  browser.getCurrentUrl().then(console.log);
});
Given(/^I click on the "([^"]*)" button$/, button => {

});
When(/^I fill the form with the required information$/, () => {

});
Then(/^the game server is created$/, () => {

});
Then(/^I am redirected to the configuration page for the game server$/, () => {

});
When(/^I may or may not fill the form with the required information$/, () => {

});
When(/^I click the "([^"]*)" button$/, button => {

});
Then(/^the game server is not created$/, () => {

});
Then(/^I stay on the dashboard page$/, () => {

});
Given(/^I am on the detail page for the game server$/, () => {

});
Then(/^the game server is reconfigured$/, () => {

});
Then(/^I am redirected to the detail page for the game server$/, () => {

});
Then(/^the game server is not reconfigured$/, () => {

});
Then(/^I can see (\d+) game servers$/, amountGameServers => {

});
Then(/^The game server details are collapsed$/, () => {

});
When(/^I click on a game server entry$/, () => {

});
Then(/^The clicked game server entry expands itself$/, () => {

});
Given(/^I am logged in$/, async () => {
  loginPage = new LoginPage();

  await loginPage.navigateTo();
  await loginPage.login();
});
