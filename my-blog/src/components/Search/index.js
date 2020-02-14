import React, { useState, useEffect, useRef } from 'react'

import { Clear } from 'styled-icons/material/Clear'
import * as S from './styled'
import PostList from '../PostList'

const Search = ({ props }) => {
    const posts = props.data.allMarkdownRemark.edges
    const [filteredPosts, setFilteredPosts] = useState([])
    const refInput = useRef(null)

    useEffect(() => {
        setFilteredPosts(
            posts
                .map(({ node: { fields: { slug:id } } }) => id)
        )
    }, [])

    const filterPosts = inputValue => {
        if(!(inputValue && inputValue.trim())){
            return
        }

        setFilteredPosts(
            posts 
                .filter(({
                    node: { frontmatter } 
                }) => {
                    const values = Object.values(frontmatter) || []
                    return values
                        .some(child => {
                            const filterValue = String(inputValue).trim().toLowerCase()
                            return child.trim().toLowerCase().includes(filterValue)
                        })
                })
                .map(({ node: { fields: { slug:id } } }) => id)
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
                        onChange={event => filterPosts(event.target.value || '')}
                        ref={refInput}
                    />
                    {refInput && 
                    refInput.current && 
                    refInput.current.value &&
                    <span 
                        onClick={() => {
                            refInput.current.value = ''
                            refInput.current.focus()
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