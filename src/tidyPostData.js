
const tidyPostData = (post) => {
  let scrapedData = {
    media_id: post.node.id,
    shortcode: post.node.shortcode,
    text: post.node.edge_media_to_caption.edges[0] && post.node.edge_media_to_caption.edges[0].node.text,
    comment_count: post.node.edge_media_to_comment.count,
    like_count: post.node.edge_liked_by.count,
    display_url: post.node.display_url,
    owner_id: post.node.owner.id,
    date: post.node.taken_at_timestamp,
    thumbnail: post.node.thumbnail_src,
    thumbnail_resource: post.node.thumbnail_resources,
    is_video: post.node.is_video
  }

  if (post.node.is_video) {
    scrapedData.video_url = '' // TODO find correct node
    scrapedData.video_view_count = post.node.video_view_count;
  }

  return scrapedData
}

module.exports = tidyPostData
