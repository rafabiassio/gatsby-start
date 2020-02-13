const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

// To add slug fiel to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(12)}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return graphql(`
    {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              background
              category
              date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
              description
              title
            }
            timeToRead
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }          
    `)
    .then(result => {
        const posts = result.data.allMarkdownRemark.edges

      Promise.all([
        blogPost({ posts, createPage }),
        blogList({ posts, createPage })
      ])
      .then(result => result.forEach(msg => console.info(msg)))

    })
}

const blogPost = ({ posts, createPage}) => {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < posts.length; i++) {
      const { node, previous, next } = posts[i]

      createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
              slug: node.fields.slug,
              previousPost: next,
              nextPost: previous,
          }
      })
    }

    resolve('Blog post created')
  })
}

const blogList = ({ posts, createPage}) => {
  return new Promise((resolve, reject) => {

      const postsPerPage = 6
      const numPages = Math.ceil(posts.length / postsPerPage)
      const pages = Array.from({ length: numPages })

      for(let index = 0; index < pages.length; index++){
        createPage({
          path: index === 0 ? '/' : `/page/${index + 1}`,
          component: path.resolve('./src/templates/blog-list.js'),
          context: {
              limit: postsPerPage,
              skip: (index * postsPerPage),
              numPages,
              currentPage: (index + 1)
          }
        })
      }

    resolve('Blog list created')
  })
}