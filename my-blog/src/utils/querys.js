const PostsQuery = `{
    posts: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          frontmatter {
            category
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            description
            title
          }
          excerpt(pruneLenght: 5000)
        }
      }
    }
  }`

function flatten (arr) {
    return arr
        .map(({ node: { frontmatter, ...rest }}) => ({
            ...frontmatter,
            ...rest
        }))
}