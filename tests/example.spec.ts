import { test, expect, Locator } from '@playwright/test'
import { ACCESS_TOKEN_NAME, STRAVA_API_URL, STRAVA_UI_URL } from '../src/constants'

test.describe('Home page', () => {
  test('with no access token cookie', async ({ page }) => {
    let authBtn: Locator
    
    await test.step('has auth button', async () => {
      await page.goto('http://localhost:5173/')
      authBtn = page.getByTestId('auth-btn')
      await expect(authBtn).toBeVisible()
    })
    
    await test.step('redirects to Strava auth page when button is clicked', async () => {
      const stravaUIRegexp = new RegExp(`^${STRAVA_UI_URL}`, 'i')
      await authBtn.click()
      await expect(page).toHaveURL(stravaUIRegexp)
    })
  })

  test('with access token cookie', async ({ page, context }) => {
    let showPhotos: Locator

    await test.step('has show photos button', async () => {
      await context.addCookies([{
        name: ACCESS_TOKEN_NAME,
        value: '666',
        domain: 'localhost',
        path: '/',
      }])

      await page.goto('http://localhost:5173/')

      showPhotos = page.getByTestId('show-photos')
      
      await expect(showPhotos).toBeVisible()
    })

    await test.step('fetches photos when button is clicked', async () => {
      const stravaAPIRegexp = new RegExp(`^${STRAVA_API_URL}`, 'i')
      const requestPromise = page.waitForRequest(stravaAPIRegexp)
      await showPhotos.click()
      const req = await requestPromise
      expect(req.method()).toBe('GET')
    })
  })
})
