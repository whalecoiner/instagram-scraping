const fs = require('fs')
const path = require('path')
const parseData = require('../parseData')

let instagramProfileHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramUserProfile.html'))

describe('Checking the basics', () => {

  test('Fail at no arguments', async () => {
    await expect(parseData()).rejects.toThrow('No data supplied.')
  })

  test('Passes with lovely data', async () => {
    await expect(parseData(instagramProfileHtml.toString())).resolves.toHaveProperty('entry_data')
  })

})
