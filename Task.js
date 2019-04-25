require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until, Alert} = require('selenium-webdriver');
describe('Checkout http://localhost:3000/home', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    it('Add task item and then delete for phuketlist', async function() {
		await driver.manage().window().maximize();
			
        // Load the page
        await driver.get('http://localhost:3000/home');
        
        // Find the search box by id
        await driver.findElement(By.linkText("Login")).click();

        // Log in first
        await driver.findElement(By.id("email")).sendKeys("testUser@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("testUser");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();

        // Create item
        await driver.wait(until.elementLocated(By.id('new_task')), 10000).sendKeys("Lorem Ipsum");
        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Add New Task')]"))).click();

        // Now delete item
        await driver.wait(until.elementLocated(By.xpath("//*[@title=\"delete-Lorem Ipsum\"]"))).click();

        // Log out
        await driver.findElement(By.linkText("Account")).click();
        await driver.findElement(By.linkText("Sign out")).click();
    });
    // close the browser after running tests
    after(() => driver && driver.quit());
})
