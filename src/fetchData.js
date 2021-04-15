const fetch = require('node-fetch')
const proxy = require(' proxy-list-random')
const testProxy = require("@devhigley/test-proxy")
const randomUseragent = require('random-useragent')

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const fetchData = async (url) => {
  if (!validURL(url)) throw new Error('Supplied URL is not valid')

  let proxies = await proxy()
  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)]

  // check proxy
  await testProxy(randomProxy)

  // use a randomised proxy
  const proxyAgent = new HttpsProxyAgent('randomProxy')

  // use a randomised useragent

  let fetchOptions = {
    agent: proxyAgent,
    headers: {
      'User-Agent': randomUseragent.getRandom()
    }
  }

  // fetch userpage HTML
  let response = await fetch(url, fetchOptions)
  const body = await response.text()

  return body
}

module.exports = fetchData
