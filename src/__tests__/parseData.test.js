const fs = require('fs')
const path = require('path')
const parseData = require('../parseData')

let instagramProfileHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramUserProfile.html'))
let instagramVideoHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramVideo.html'))
let instagramPostHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramPost.html'))
let instagramPhotoHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramPhoto.html'))

describe('Checking the basics', () => {

  test('Fail at no arguments', async () => {
    await expect(parseData()).rejects.toThrow('No data supplied.')
  })

  test('Fails with invalid HTML', async () => {
    await expect(parseData('<p>LOOK AT MY HTML</p>')).rejects.toThrow('Could not find Instagram code in HTML')
  })

  test('Passes with valid Profile HTML', async () => {
    await expect(parseData(instagramProfileHtml.toString())).resolves.toHaveProperty('entry_data')
  })

  test('Passes with valid video HTML', async () => {
    await expect(parseData(instagramVideoHtml.toString())).resolves.toHaveProperty('entry_data')
  })

  test('Passes with valid photo HTML', async () => {
    await expect(parseData(instagramPhotoHtml.toString())).resolves.toHaveProperty('entry_data')
  })

  test('Passes with valid Post/Carousel/sidecar HTML', async () => {
    await expect(parseData(instagramPostHtml.toString())).resolves.toHaveProperty('entry_data')
  })



})
