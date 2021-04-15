const fs = require('fs')
const path = require('path')
const fetchData = require('../fetchData')

let instagramProfileHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramUserProfile.html'))
let instagramVideoHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramVideo.html'))
let instagramPostHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramPost.html'))
let instagramPhotoHtml = fs.readFileSync(path.join(__dirname, 'fixtures/instagramPhoto.html'))


let instagramProfileUrl = 'https://www.instagram.com/sonniesedge'
let instagramVideoUrl = 'https://www.instagram.com/p/CMnEkpjKNi4/'
let instagramPostUrl = 'https://www.instagram.com/p/CNrRisbpRQf/'
let instagramPhotoUrl = 'https://www.instagram.com/p/CNpE0y9pvZC/'

describe('Checking the basics', () => {

  test('Fail at no arguments', async () => {
    await expect(fetchData()).rejects.toThrow('No URL argument supplied.')
  })

  test('Fails with invalid URL', async () => {
    await expect(fetchData('httpppppppp://google.com')).rejects.toThrow('Supplied URL is not valid.')
  })

  test('Passes with valid Profile URL', async () => {
    await expect(fetchData(instagramProfileUrl)).resolves.toContain('<meta property="al:ios:url" content="instagram://user?username=sonniesedge" />')
  })

  test('Passes with valid video URL', async () => {
    await expect(fetchData(instagramVideoUrl)).toContain('content=\"https://www.instagram.com/p/CMnEkpjKNi4/\" />')
  })

  test('Passes with valid photo URL', async () => {
    await expect(fetchData(instagramPhotoUrl)).resolves.toContain('content=\"https://www.instagram.com/p/CNpE0y9pvZC/\" />')
  })

  test('Passes with valid Post/Carousel/sidecar URL', async () => {
    await expect(fetchData(instagramPostUrl)).resolves.toContain('content=\"https://www.instagram.com/p/CNrRisbpRQf/\" />')
  })

})
