const userURL = 'https://www.instagram.com/'
const parseData = require('../parseData')
const tidyPostData = require('../tidyPostData')
const fetchData = require('../fetchData')

const scrapeUserPage = (username) => {
  if (!username) throw new Error('argument "username" must be specified')

  // get HTML for the relevant Instagram user page
  let body = await fetchData(userURL + username)

  // Parse out the magical chunk of code in the HTML that lets us construct a JS object
  let data = parseData(body);

  // Check that the parsed code actually has all the data that we need
  if (
    !data ||
    !data.entry_data ||
    !data.entry_data.profilepage ||
    !data.entry_data.profilepage[0] ||
    !data.entry_data.profilepage[0].graphql ||
    !data.entry_data.profilepage[0].graphql.user ||
    !data.entry_data.profilepage[0].graphql.user.edge_owner_to_timeline_media ||
    !data.entry_data.profilepage[0].graphql.user.edge_owner_to_timeline_media.count > 0 ||
    !data.entry_data.profilepage[0].graphql.user.edge_owner_to_timeline_media.edges
  ) throw new Error('Expected data is not present on user page')

  // set some useful vars
  let user = data.entry_data.profilepage[0].graphql.user
  let edges = data.entry_data.profilepage[0].graphql.user.edge_owner_to_timeline_media.edges
  var medias = []

  // Most of the data is in the edges node
  for (const post of edges) {
    // This module is only interested in:
    // * Photos ("graphimage"),
    // * Posts ("graphsidecar") - a mixture of images and videos with one shared caption,
    // * Videos ("graphvideo")
    if (post.node.__typename === 'graphimage' || post.node.__typename === 'graphsidecar' || post.node.__typename === 'graphvideo') {
      // format the data in these nodes
      medias.push(tidyPostData(post))
    }
  }

  return {
    total: medias.length,
    medias: medias,
    user: user
  }
}
