const {Builder, By, Key, Capabilities, until} = require('selenium-webdriver');
const sleep = require('sleep');
const assert = require('assert');
const faker = require('faker');

const chromeCapabilities = Capabilities.chrome();
chromeCapabilities.setPageLoadStrategy('eager');

const randomEmail = faker.internet.email();
const randomPass = faker.internet.password(7);
const randomName = faker.name.firstName();
const randomMiddleName = faker.name.lastName();
const randomLastName = faker.name.lastName();

const driver = new Builder()
  .withCapabilities(chromeCapabilities)
  .forBrowser('chrome')
  .build();

async function loginSuccess() {
  try {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.name('login')), 3000).sendKeys(randomEmail, Key.TAB);
    sleep.sleep(3);
    await driver
      .wait(until.elementLocated(By.name('password')), 3000)
      .sendKeys(randomPass, Key.TAB);
    sleep.sleep(3);
    await driver
      .wait(until.elementLocated(By.xpath(`//button[@data-testid='loginbtn']`)), 3000)
      .click();
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Choose your fireplace')]")),
      3000
    );
    sleep.sleep(3);
    console.log('login passed');
  } catch (e) {
    console.log(`login failed: ${e.message}`);
  }
}

async function registerAndLogoutSuccess() {
  try {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.linkText('Need an account?')), 3000).click();

    await driver.wait(until.elementLocated(By.name('email')), 3000).sendKeys(randomEmail, Key.TAB);
    sleep.sleep(2);
    await driver
      .wait(until.elementLocated(By.name('password')), 3000)
      .sendKeys(randomPass, Key.TAB);
    sleep.sleep(2);
    await driver.wait(until.elementLocated(By.name('name')), 3000).sendKeys(randomName, Key.TAB);
    sleep.sleep(2);
    await driver
      .wait(until.elementLocated(By.name('middleName')), 3000)
      .sendKeys(randomMiddleName, Key.TAB);
    sleep.sleep(2);
    await driver
      .wait(until.elementLocated(By.name('surname')), 3000)
      .sendKeys(randomLastName, Key.TAB);
    sleep.sleep(2);
    await driver
      .wait(until.elementLocated(By.name('ReactDatepicker')), 3000)
      .sendKeys('12/16/1997', Key.TAB);
    sleep.sleep(2);
    await driver
      .wait(until.elementLocated(By.xpath(`//button[@data-testid='signupbtn']`)), 3000)
      .click();
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Choose your fireplace')]")),
      3000
    );
    sleep.sleep(3);
    await (
      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Logout')]")), 3000)
    ).click();
    console.log('register passed');
  } catch (e) {
    console.log(`register failed: ${e.message}`);
  }
}

(async function myFunction() {
  // Navigate to Url

  try {
    await registerAndLogoutSuccess();
    await loginSuccess();
    // await registerSuccess(driver);
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }

  // await driver.get('http://seniorkot.com');
})();
