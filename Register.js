require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
describe('Checkout http://localhost:3000/home', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    it('Register for phuketlist', async function() {
		await driver.manage().window().maximize();
		
        // Load the page
        await driver.get('http://localhost:3000/home');
        // Find the search box by id
        await driver.findElement(By.linkText("Register")).click();
        //search for text fields
        await driver.findElement(By.id("name")).sendKeys("testUser");
        await driver.findElement(By.id("email")).sendKeys("testUser@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("testUser");
        await driver.findElement(By.className("btn btn-primary btn-block ")).click();
        await driver.wait(until.elementLocated(By.className('sub-header')), 10000);
        
    });
    // close the browser after running tests
    after(() => driver && driver.quit());
})