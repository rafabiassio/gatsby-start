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
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }        
    `)
    .then(result => {
        const list = result.data.allMarkdownRemark.edges

        for(let i = 0; i < list.length; i++) {
            const { node } = list[i]

            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/blog-post.js'),
                context: {
                    slug: node.fields.slug
                }
            })
        }
    })
}