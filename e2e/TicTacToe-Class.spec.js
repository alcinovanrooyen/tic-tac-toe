// @ts-check
const { test, expect } = require('@playwright/test');


test('Checking clicks alternating between X and O \n for blocks 1 - 9', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    let messageShowing = false, block;
    for (let i = 1; i < 10; i++) {
        messageShowing = await page.getByTestId('message-modal').isVisible();
        // Minimum of 5 clicks needed to win
        // If message is showing then we can no longer click the blocks
        // If message is showing we won't test further,
        // but atleas 5 blocks can be tested for alternating X and O.
        if (i < 5  && messageShowing)  {
            test.fail(true, 'modal showing too early');
            // throw new Error('Message modal showing and minimum of 5 blocks not clicked');
        }
    
        // Only test if message modal not covering blocks
        if (!messageShowing) { 
            block = await page.getByTestId(`tic-${i}`);
            await block.click();
            // Expect the shape to be X or O depending on nth click,
            // being odd or even meaning it's alternating as expected.
            await expect( block ).toContainText(`${ i % 2 ? 'X' : 'O'}`);
        }
    }
});

