import React, { useState, useEffect } from 'react'
import getThemeColor from '../../utils/getThemeColor'

import { Home } from 'styled-icons/boxicons-solid/Home'
import { Search } from 'styled-icons/boxicons-regular/Search'
import { Lightbulb as Light } from 'styled-icons/remix-fill/Lightbulb'
import { Grid } from 'styled-icons/boxicons-solid/Grid'
import { ListUl as List } from 'styled-icons/boxicons-regular/ListUl'
import { ArrowToTop as Arrow } from 'styled-icons/boxicons-solid/ArrowToTop'

import * as S from './styled'

const MenuBar = () => {
    const [theme, setTheme] = useState(null)
    const [display, setDisplay] = useState(null)

    const isDarkMode = (theme === 'dark')
    const isListView = (display === 'list')

    useEffect(() => {
        setTheme(window.__theme)
        setDisplay(window.__display)
        window.__onThemeChange = () => setTheme(window.__theme)
        window.__onDisplayChange = () => setDisplay(window.__display)
    }, [])

    return (
        <S.MenuBarWrapper>
            <S.MenuBarGroup>
                <S.MenuBarLink to="/" title="Voltar para Home" cover direction="down" bg={getThemeColor()} duration={0.6}>
                    <S.MenuBarItem><Home /></S.MenuBarItem>
                </S.MenuBarLink>
                <S.MenuBarLink to="/search" title="Pesquisar" cover direction="up" bg={getThemeColor()} duration={0.6}>
                    <S.MenuBarItem><Search /></S.MenuBarItem>
                </S.MenuBarLink>
            </S.MenuBarGroup>
            <S.MenuBarGroup> 
                <S.MenuBarItem 
                    title="Mudar tema"
                    onClick={() => {
                        window.__setPreferredTheme(isDarkMode ? 'light' : 'dark')
                    }}
                    className={theme}
                >
                    <Light />
                </S.MenuBarItem>
                <S.MenuBarItem 
                    title="Mudar visualização"
                    onClick={() => {
                        window.__setPreferredDisplay(isListView ? 'grid' : 'list')
                    }}
                >
                    {isListView ? <Grid /> : <List />}
                </S.MenuBarItem>
                <S.MenuBarItem title="Ir ao topo"><Arrow /></S.MenuBarItem>
            </S.MenuBarGroup>
        </S.MenuBarWrapper>
    )
}

export default MenuBar