// @ts-check
const { test, expect } = require('@playwright/test');

const  checkXOAlternating =  ({ page }) => new Promise(async (resolve) => {
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
            await expect( block ).toContainText(`${ i % 2 ? 'X' : 'O'}`); // Not sure, maybe later use .innerText()  == X | Y to get exact match, instead of using .toContainText method.
            
        }
    }
    
    resolve();
});

test('Checking clicks alternating between X and O \n for blocks 1 - 9', checkXOAlternating);


test.describe("Test the reset buttons on game work well.", () => {
    test('Test reset button during game', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        // Click 4 blocks to avoid modal
        for (let i = 1; i < 5; i++)
            await page.getByTestId(`tic-${i}`).click();
        // Click the reset button
        await page.getByTestId('reset-1').click();
        // Check all 9 blocks are empty
        for (let i = 1; i < 10; i++)
            await expect( page.getByTestId(`tic-${i}`) ).toBeEmpty();
        // Check X and O alternating as expected after reset
        await checkXOAlternating({ page });
    });
    
    test('Test reset button on modal', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        const messageModal = await page.getByTestId('message-modal');
        
        // Click 7 blocks to invoke modal by causing X (Player 1) to win
        for (let i = 1; i < 8; i++)
            await page.getByTestId(`tic-${i}`).click();
        // Check modal is showing
        await expect( messageModal ).toBeVisible();
        // Click the reset button
        await page.getByTestId('reset-2').click();
        // Check modal is hidden
        await expect( messageModal ).toBeHidden();
        // Check all 9 blocks are empty
        for (let i = 1; i < 10; i++)
            await expect( page.getByTestId(`tic-${i}`) ).toBeEmpty();
      // Check X and O alternating as expected after reset
        await checkXOAlternating({ page });
    });
});
