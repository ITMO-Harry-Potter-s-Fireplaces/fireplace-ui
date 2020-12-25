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

const LOGIN_SLEEP = 0;
const REGISTER_SLEEP = 0;
const CREATE_CLAIM_SLEEP = 0;

const driver = new Builder()
  .withCapabilities(chromeCapabilities)
  .forBrowser('chrome')
  .build();

async function loginSuccess() {
  try {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.name('login')), 3000).sendKeys(randomEmail, Key.TAB);
    sleep.sleep(LOGIN_SLEEP);
    await driver
      .wait(until.elementLocated(By.name('password')), 3000)
      .sendKeys(randomPass, Key.TAB);
    sleep.sleep(LOGIN_SLEEP);
    await driver
      .wait(until.elementLocated(By.xpath(`//button[@data-testid='loginbtn']`)), 3000)
      .click();
    const res = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Choose your fireplace')]")),
      3000
    );
    assert(await res.getText(), 'Choose your fireplace');
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
    sleep.sleep(REGISTER_SLEEP);
    await driver
      .wait(until.elementLocated(By.name('password')), 3000)
      .sendKeys(randomPass, Key.TAB);
    sleep.sleep(REGISTER_SLEEP);
    await driver.wait(until.elementLocated(By.name('name')), 3000).sendKeys(randomName, Key.TAB);
    sleep.sleep(REGISTER_SLEEP);
    await driver
      .wait(until.elementLocated(By.name('middleName')), 3000)
      .sendKeys(randomMiddleName, Key.TAB);
    sleep.sleep(REGISTER_SLEEP);
    await driver
      .wait(until.elementLocated(By.name('surname')), 3000)
      .sendKeys(randomLastName, Key.TAB);
    sleep.sleep(REGISTER_SLEEP);
    await driver
      .wait(until.elementLocated(By.name('ReactDatepicker')), 3000)
      .sendKeys('12/16/1997', Key.TAB);
    sleep.sleep(REGISTER_SLEEP);
    await driver
      .wait(until.elementLocated(By.xpath(`//button[@data-testid='signupbtn']`)), 3000)
      .click();
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Choose your fireplace')]")),
      3000
    );
    sleep.sleep(3);
    await driver
      .wait(until.elementLocated(By.xpath("//*[contains(text(), 'Logout')]")), 3000)
      .click();

    console.log('register passed');
  } catch (e) {
    console.log(`register failed: ${e.message}`);
  }
}

async function createClaimSuccess() {
  try {
    await driver.get('http://localhost:3000/home');
    await driver
      .wait(until.elementLocated(By.xpath(`//*[@id="map"]/div[1]/div[4]/img[6]`)), 3000)
      .click();
    sleep.sleep(CREATE_CLAIM_SLEEP);
    // open menu
    await driver
      .wait(until.elementLocated(By.xpath(`//*[@id="demo-simple-select2"]`)), 3000)
      .click();
    sleep.sleep(CREATE_CLAIM_SLEEP);
    // click on first subitem
    await driver
      .wait(until.elementLocated(By.xpath(`//*[@id="menu-"]/div[3]/ul/li[1]`)), 3000)
      .click();
    sleep.sleep(CREATE_CLAIM_SLEEP);
    await driver
      .wait(until.elementLocated(By.xpath("//*[contains(text(), 'Send')]")), 3000)
      .click();
    sleep.sleep(CREATE_CLAIM_SLEEP);
    await driver
      .wait(until.elementLocated(By.xpath("//*[contains(text(), 'success')]")), 6000)
      .click();
    console.log('create claim  passed');
  } catch (e) {
    console.log(`create claim failed: ${e.message}`);
  }
}

(async function myFunction() {
  // Navigate to Url

  try {
    await registerAndLogoutSuccess();
    await loginSuccess();
    await createClaimSuccess();
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }

  // await driver.get('http://seniorkot.com');
})();
