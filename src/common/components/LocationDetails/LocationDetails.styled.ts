import styled from "styled-components";
import theme from "../../../styles/theme";

interface Props {
  $selected: boolean
}
export const ItemWrapper = styled.div<Props>`
  width: fit-content;

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
