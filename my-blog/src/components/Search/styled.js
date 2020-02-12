import styled from "styled-components"

export const SearchWrapper = styled.section`
  background: #16202c;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: opacity 0.4s;
`

export const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;

    padding: 6rem 3rem 0.5rem 3rem;
`
export const SearchInput = styled.div`
    color: #8899a6;
    display: flex;
    padding: 0.5rem;
    width: 100%;
    & input {
        color: #8899a6;
        background: none;
        border: none;
        border-bottom: 1px solid #38444d;
        display: flex;
        font-size: 1.6rem;
        padding: 0.5rem;
        width: 100%;
        &::placeholder {
            color: #8899a6;
        }
    }
    & span {
        color: #8899a6;
        cursor: pointer;
        height: 3.75rem;
        padding: 0.6rem 3.8rem;
        position: absolute;
        right: 84px;
        width: 3.75rem;
        & svg {
            width: 1.8rem;
            height: 1.8rem;
        }
        &:hover {
            color: #1fa1f2;
        }
    }
`

export const ClearIcon = styled.span`
  cursor: pointer;
  display: block;
  height: 3.75rem;
  padding: 1.1rem;
  position: absolute;
  right: 84px;
  width: 3.75rem;
  color:#38444d;
  &:hover {
    color: #1fa1f2;
  }
`

export const Stats = styled.div`
    padding: 0.5rem;
    color: #8899a6;
`