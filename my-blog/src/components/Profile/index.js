import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Avatar from '../Avatar'
import getThemeColor from '../../utils/getThemeColor'

import * as S from './styled'

const Profile = () => {
  const {
    site: {
      siteMetadata: {title, description, author}
    }} = useStaticQuery(graphql`
    query MySiteMetadata {
        site {
          siteMetadata {
            author
            title
            description
          }
        }
      }
    `)

    return (
      <S.ProfileWrapper>
        <S.ProfileLink to="/" cover direction="left" bg={getThemeColor()} duration={0.6}>
          <Avatar/>
          <S.ProfileAuthor>
            {author}
          <S.ProfilePosition>{title}</S.ProfilePosition>
          </S.ProfileAuthor>
        </S.ProfileLink>
        <S.ProfileDescription>{description}</S.ProfileDescription>  
      </S.ProfileWrapper>
    )
}

export default Profile