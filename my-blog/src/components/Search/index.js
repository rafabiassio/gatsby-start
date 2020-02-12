import React, { useState, useEffect, useRef } from 'react'

import { Clear } from 'styled-icons/material/Clear'
import * as S from './styled'
import PostList from '../PostList'

const Search = ({ props }) => {
    const posts = props.data.allMarkdownRemark.edges
    const [postList, setPostList] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const refInput = useRef(null)

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

    const statsString = () => {
        const number = `${filteredPosts.length === 0 ? 'Nenhum' : filteredPosts.length}`
        const plural = filteredPosts.length > 1 ? 's' : ''
        return `${number} resultado${plural} encontrado${plural}`
    }

    return (
        <S.SearchWrapper>
            <S.SearchBox>
                <S.SearchInput>
                    <input 
                        placeholder="Pesquisar..."
                        autoFocus
                        onChange={event => setFilter(event.target.value || '')}
                        value={filter}
                        ref={refInput}
                    />
                    {filter &&
                    <span 
                        onClick={() => {
                            refInput.current.focus()
                            setFilter('')
                        }}
                    >
                        <Clear />
                    </span>
                    }
                </S.SearchInput>
                <S.Stats>{statsString()}</S.Stats>
            </S.SearchBox>
            <PostList 
                posts={posts
                        .filter(({
                            node: { 
                                fields: { slug }
                            }
                        }) => filteredPosts.some(filtered => filtered === slug))
                } 
            />
        </S.SearchWrapper>
    )
}

export default Search