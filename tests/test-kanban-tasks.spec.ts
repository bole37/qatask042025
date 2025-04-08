import { test, expect } from '@playwright/test';

test.describe('Test Kanban Tasks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://jira.trungk18.com/project/board');
});

test('Create issue', async ({ page }) => {

  //Create issue
  await page.getByRole('complementary').locator('svg').nth(2).click();
  await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').click();
  await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').fill('Task title test');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('quill-editor div').nth(2).fill('Description');
  await page.locator('j-user div').filter({ hasText: 'Trung Vo' }).click();
  await page.locator('j-user').filter({ hasText: 'Iron Man' }).locator('div').first().click();
  await page.locator('nz-select-top-control').filter({ hasText: '[object Text]' }).click();
  await page.getByTitle('Spider Man').locator('div').nth(1).click();
  await page.getByRole('button', { name: 'Create Issue' }).click();

  //Check if issue is created
  await expect(page.getByText('test')).toBeVisible();
 
});

test('Check if Save button is disabled', async ({ 
  page }) => {
    //Create issue button
    await page.getByRole('complementary').locator('svg').nth(2).click();
    //Get the Save button disabled state
    const isSaveButtonDisabled = await page.getByRole('button', { name: 'Create Issue' }).isDisabled();
    // Check if the button is disabled
    expect(isSaveButtonDisabled).toBe(true);

  });
  

//Edit issue title and description
test('Edit issue', async ({ page }) => {

  //Create issue
  await page.getByRole('complementary').locator('svg').nth(2).click();
  await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').click();
  await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').fill('Task title test');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('quill-editor div').nth(2).fill('Description');
  await page.locator('j-user div').filter({ hasText: 'Trung Vo' }).click();
  await page.locator('j-user').filter({ hasText: 'Iron Man' }).locator('div').first().click();
  await page.locator('nz-select-top-control').filter({ hasText: '[object Text]' }).click();
  await page.getByTitle('Spider Man').locator('div').nth(1).click();
  await page.getByRole('button', { name: 'Create Issue' }).click();

  //Edit issue
  await page.getByText('Task title test Task-').click();
  await page.locator('issue-title').getByRole('textbox').click();
  await page.locator('issue-title').getByRole('textbox').fill('Edit title test');
  await page.getByRole('paragraph').filter({ hasText: 'Description' }).click();
  await page.locator('div').filter({ hasText: /^Description$/ }).nth(2).press('ArrowRight');
  await page.locator('div').filter({ hasText: /^Description$/ }).nth(2).press('Backspace');
  await page.locator('div').filter({ hasText: /^Description$/ }).nth(2).fill('Edit description text');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();

  //Check if issue is edited
  await page.getByText('Edit title test').isVisible();
  
});

//Move issue to another column
test('Move issue to another column', async ({ page }) => {

    //Create issue
    await page.getByRole('complementary').locator('svg').nth(2).click();
    await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').click();
    await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').fill('Task for move test');
    await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
    await page.locator('quill-editor div').nth(2).fill('Description');
    await page.locator('j-user div').filter({ hasText: 'Trung Vo' }).click();
    await page.locator('j-user').filter({ hasText: 'Iron Man' }).locator('div').first().click();
    await page.locator('nz-select-top-control').filter({ hasText: '[object Text]' }).click();
    await page.getByTitle('Spider Man').locator('div').nth(1).click();
    await page.getByRole('button', { name: 'Create Issue' }).click();

    //Move issue
    await page.getByText('Task for move test').click();
    await page.getByRole('button', { name: 'Backlog' }).click();
    await page.getByText('Selected for Development', { exact: true }).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();

    //Check if issue is moved
    await page.getByText('Task for move test').click();
    await expect(page.getByRole('button', { name: 'Selected for Development' })).toBeVisible();

});

//Delete issue
test('Delete issue', async ({ page }) => {

      //Create issue
      await page.getByRole('complementary').locator('svg').nth(2).click();
      await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').click();
      await page.locator('#cdk-overlay-0 form div').filter({ hasText: 'Short summary' }).getByRole('textbox').fill('Task for delete test');
      await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
      await page.locator('quill-editor div').nth(2).fill('Description');
      await page.locator('j-user div').filter({ hasText: 'Trung Vo' }).click();
      await page.locator('j-user').filter({ hasText: 'Iron Man' }).locator('div').first().click();
      await page.locator('nz-select-top-control').filter({ hasText: '[object Text]' }).click();
      await page.getByTitle('Spider Man').locator('div').nth(1).click();
      await page.getByRole('button', { name: 'Create Issue' }).click();

      //Delete issue
      await page.getByText('Task for delete test').click();
      await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
      await page.getByRole('button', { name: 'Delete' }).click();

      //Check if issue is deleted
      await expect(page.getByText('Task for delete test')).toBeHidden();
    
});

});;