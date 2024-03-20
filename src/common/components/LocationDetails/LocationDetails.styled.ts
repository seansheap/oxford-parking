import styled from "styled-components";
import theme from "../../../styles/theme";

interface Props {
  $selected: boolean
}
export const ItemWrapper = styled.div<Props>`
  width: calc(100% - 0.8rem); /* Adjusted width to account for padding and margin */
  box-sizing: border-box; 
  @media (max-width: ${theme.breakpoints.md + "px"}) {
    width: auto;
  }
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0.4rem;
  padding: 1rem;
  background: ${theme.light.foreground};
  border: 1px solid ${props => props.$selected ? theme.light.primary : "transparent"};

  p{
    padding: 0;
    margin: 0;
  }

`
export const RestrictionWrapper = styled.div`
  .day-button{
    margin:1px;
    margin: 5px 3px;
    border: ${theme.light.backgroundDarkGrey} 1px solid;
    border-radius: 1rem;
  }
  .day-button-active{
    background:greenyellow;
  }
`