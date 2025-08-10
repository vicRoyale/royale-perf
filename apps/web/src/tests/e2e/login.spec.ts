import { test, expect } from '@playwright/test'

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.getByLabel('Email').fill('agent1@royale.fr')
  await page.getByLabel('Mot de passe').fill('Agent#2025')
  await page.getByRole('button', { name: 'Se connecter' }).click()
  await expect(page).toHaveURL(/dashboard/)
})
