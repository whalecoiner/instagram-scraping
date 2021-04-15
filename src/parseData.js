const dataRegEx = /window\._sharedData\s?=\s?({.+);<\/script>/;

const parseData = async (html) => {
  try {
    if (!html) throw new Error('No data supplied.')
    let dataString = html.match(dataRegEx)[1]
    let json = JSON.parse(dataString)
    return json
  } catch (error) {
    throw error
  }
}

module.exports = parseData
