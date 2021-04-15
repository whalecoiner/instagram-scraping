const fetch = require('node-fetch')
const proxy = require('./proxy-list-random')
const testProxy = require("@devhigley/test-proxy")
const randomUseragent = require('random-useragent')
const randomItem = require('random-item')
const HttpsProxyAgent = require('https-proxy-agent')

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
  if (!url) throw new Error('No URL argument supplied.')
  if (!validURL(url)) throw new Error('Supplied URL is not valid.')

  const proxies = await proxy()
  console.log('proxies', typeof proxies)

  const randomProxy = randomItem(proxies)

  console.log('randomProxy: ', randomProxy)

  // check proxy
  // let testResult = await testProxy(randomProxy)

  // console.log('passed?', testResult)

  // use a randomised proxy
  // const proxyAgent = new HttpsProxyAgent(randomProxy)

  // use a randomised useragent

  let fetchOptions = {
    // agent: proxyAgent,
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
