import React, { memo, useState, useEffect } from 'react'
import PostItem from "../PostItem"

const Search = ({ props }) => {
    const posts = props.data.allMarkdownRemark.edges
    const [postList, setPostList] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(() => {
        setPostList(
            posts
                .map(({
                    node: {
                        fields: { slug: id },
                        frontmatter
                    } 
                }) => ({
                    id,
                    values: Object.values(frontmatter)
                }))
        )
    }, [])

    useEffect(() => {
        if (postList.length > 0){
            if(filter){
                filterPosts()
            } else {
                setFilteredPosts(postList.map(item => item.id))
            }
        } else {
            setFilteredPosts([])
        }
    }, [postList, filter])

    const filterPosts = () => {
        if(!(filter && filter.trim() && postList.length > 0)){
            return setFilteredPosts([...postList])
        }
        setFilteredPosts(
            postList 
                .filter(post => {
                    return post.values
                        .some(child => {
                            const filterValue = String(filter).trim().toLowerCase()
                            return child.trim().toLowerCase().includes(filterValue)
                        })
                })
                .map(item => item.id)
        )
    }

    return (
        <>
             <input onChange={(event) => {
                const { target: { value }} = event
                return setFilter(value || '')
            }} />
            {posts
                .filter(({
                    node: { 
                        fields: { slug }
                    }
                }) => {
                    return filteredPosts.some(filtered => filtered === slug)
                })
                .map(({ 
                    node: {
                        fields: { slug },
                        frontmatter: { background, category, date, description, title },
                        timeToRead
                    }
                }, key) => (
            <PostItem 
                key={key}
                slug={slug}
                background={background}
                category={category}
                date={date}
                timeToRead={timeToRead}
                title={title}
                description={description}
            />
            ))}
        </>
    )
}

export default memo(Search)