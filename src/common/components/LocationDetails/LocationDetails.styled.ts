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
  padding: 0.5rem;
  background: ${theme.light.foreground};
  border: 5px solid ${props => props.$selected ? theme.light.primary : "transparent"};
  h4 {
    text-transform: uppercase;
    margin: 0.5rem 0;
  }
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
export const TimeSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row !important;
  button{
    height: 100%;
    width: 100%;
  }
  .time-select-wrapper{
    width: 60%;
    display: flex;
    flex-direction: column;
  }
  .time-button-wrapper{
    max-width: 5rem;
    width: fit-content;
    display: flex;
    flex-direction: column;
  }
`