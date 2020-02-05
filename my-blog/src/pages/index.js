import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostItem 
      slug="/about/"
      category="code" 
      date="05 de fevereiro de 2020"
      timeToRead="5"
      title="Diga não ao Java"
      description="Algumas razões para você não usar Java."
    />
  </Layout>
)

export default IndexPage
