import styled from "styled-components";
import theme from "../../../styles/theme";


export const FitterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  position: relative;
  h1{
    margin: 0.5rem;
  }
  .filter--button-wrapper{
    display: flex;
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
    top:4rem;
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


  align-items: center;
  button{
    min-width: unset;
    width: 2.2rem;
    font-size: 2rem;
    cursor: pointer;
    user-select: none;
    padding: 0;
    border: none;
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
