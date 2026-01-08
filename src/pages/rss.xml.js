import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts'

export async function GET(context) {
  const posts = await getCollection('blog')
  const publishedPosts = posts.filter(post => !post.data.draft)

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: publishedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags || []
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl'
  })
}
