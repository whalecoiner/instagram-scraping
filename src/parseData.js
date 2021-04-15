const dataRegEx = /window\._sharedData\s?=\s?({.+);<\/script>/;

const parseData = async (html) => {
  try {
    if (!html) throw new Error('No data supplied.')
    let initialMatchAttempt = html.match(dataRegEx)
    if (initialMatchAttempt === null) throw new Error('Could not find Instagram code in HTML')

    let dataString = initialMatchAttempt[1]
    let json = JSON.parse(dataString)
    return json
  } catch (error) {
    throw error
  }
}

module.exports = parseData
