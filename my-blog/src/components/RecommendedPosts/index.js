import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const RecommendedPosts = ({ previous, next }) => (
    <S.RecommendedWrapper>
        {previous && (
            <S.RecommendedLink cover direction="up" to={previous.fields.slug} className="previous">
                {previous.frontmatter.title}
            </S.RecommendedLink>
        )}
        {next && (
            <S.RecommendedLink cover direction="up" to={next.fields.slug} className="next">
                {next.frontmatter.title}
            </S.RecommendedLink>
        )}
    </S.RecommendedWrapper>
)

RecommendedPosts.propTypes = {
    previous: PropTypes.shape({
        frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired
        }),
        fields: PropTypes.shape({
            slug: PropTypes.string.isRequired
        })
    }),
    next: PropTypes.shape({
        frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired
        }),
        fields: PropTypes.shape({
            slug: PropTypes.string.isRequired
        })
    })
}

export default RecommendedPosts