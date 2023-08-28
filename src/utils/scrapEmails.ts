import { Builder, Capabilities } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

export async function scrapDatOne() {
    const options = new ChromeOptions();
    // options.addArguments('--headless');

    const driver = await new Builder()
        .withCapabilities(Capabilities.chrome())
        .setChromeOptions(options)
        .build();

    try {
        // Navigate to the active tab's URL
        const tabs = await driver.getAllWindowHandles();
        const activeTab = tabs[0];
        await driver.switchTo().window(activeTab);

        const url = await driver.getCurrentUrl();
        console.log('Current URL:', url);

        // Perform scraping actions here
        // For example, you can use driver.findElement and related methods

    } finally {
        await driver.quit();
    }
}