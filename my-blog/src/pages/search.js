import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Search from '../components/Search'

const SearchPage = props => (
    <Layout>
        <SEO 
            title="Search"
            description="Procurar posts"
        />
        <Search props={props}/>
    </Layout>
)

export const query = graphql`
    {
        allMarkdownRemark(
            sort: {fields: frontmatter___date, order: DESC}
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
            }
            timeToRead
            }
        }
        }
    }  
`

export default SearchPage 