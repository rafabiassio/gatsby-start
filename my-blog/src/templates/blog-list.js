import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

const BlogList = props => {
    const postList = props.data.allMarkdownRemark.edges

    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage -1 === 1 ? '/' : `/page/${currentPage - 1}`
    const nextPage = `/page/${currentPage + 1}`

    return (
        <Layout>
            <SEO 
                title="Home"
                description="Blog list"
            />
            <PostList posts={postList} />
            <Pagination 
                isFirst={isFirst} 
                isLast={isLast} 
                currentPage={currentPage}
                numPages={numPages}
                prevPage={prevPage}
                nextPage={nextPage} 
            />
      </Layout>
    )
}

export const query = graphql`
    query PostList($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: {fields: frontmatter___date, order: DESC}
            limit: $limit
            skip: $skip
            ) {
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
                image
            }
            timeToRead
            }
        }
        }
    }  
`

export default BlogList