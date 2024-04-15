import styled from "styled-components";
import theme from "../../../styles/theme";


export const SearchBarWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  height:2rem;
  width: 100%;
  min-width: unset;
  max-width: unset;
  margin-bottom: 0.5rem;
  @media (min-width: ${theme.breakpoints.lg + "px"}) {
    min-width: 8rem;
    max-width: 25rem;
  }
  

  position: relative;

  .search-bar--button{
    display: flex;
    width: 3rem;
    justify-content: center;
  }
  .search-input{
    width: 100%;
  }
  .searchBar{
    width: 100%;
    display: flex;
  }
  .searchBar--results-item{
    padding: 0.5rem;
    cursor: pointer;
    width: calc(100% - 1rem);
    border-bottom: 1px solid ${theme.light.backgroundGrey};
  }
  .searchBar--results-list{
    width: 100%;
    z-index: 100;
    position: absolute;
    top: 2rem;
    background-color: ${theme.light.background};

  }
`