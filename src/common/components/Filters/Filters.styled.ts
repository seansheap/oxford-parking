import styled from "styled-components";
import theme from "../../../styles/theme";


export const FitterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
  h1{
    margin: 0.5rem;
  }
  .filter--button-wrapper{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 10rem;
    gap:1rem;
    position: absolute;
    top:4rem;
    z-index: 10;
    background-color: white;
    padding: 1rem ;
    border: 1px solid ${theme.light.backgroundGrey};
  }
  .filter--button-wrapper-mobile{
    display: flex;
    flex-direction: column;
    position: absolute;
    top:6rem;
    left: 0;
    width: 100%;
    gap: 1rem;
    z-index: 10;
    padding: 1rem 0 1rem 0;
    border: 1px solid ${theme.light.backgroundGrey};
    background-color: white;
    button{
      height: 2rem;
  }

  }
.filter--title-wrapper{
  display: flex;
  flex-direction: row;

  @media (max-width: ${theme.breakpoints.md + "px"}) {
    flex-direction: column;
    align-self: start;
  }
  align-items: center;
    button{
      min-width: unset;
      width: 2.2rem;
      font-size: 2rem;
      cursor: pointer;
      user-select: none;
      padding: 0;
      border: none;
      @media (max-width: ${theme.breakpoints.md + "px"}) {
      width: 5rem;
      }
  }

}

.filter--button{
  min-width: 5rem;
  border: hidden;
  padding: 0.2rem;
  user-select: none;
  cursor: pointer;
}
`
