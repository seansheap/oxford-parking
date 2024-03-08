import styled from "styled-components";
import theme from "../../../styles/theme";

export const EditParamsWrapper = styled.section`
margin: 1rem;
form{
  div{
    display: flex;
    flex-direction: column;
  }
  display: flex;
  gap: 1rem;
}
`
export const ModeWrapper = styled.section`
  display: flex;
  flex-direction: column;
`
export const RegionWrapper = styled.div`
  
  
  display: flex;
  flex-direction: row;

  @media (max-width: ${theme.breakpoints.md + "px"}) {
    flex-direction: column;
  }
  gap: 2rem;
  padding: 1rem;
  background: ${theme.light.background};
  .mode-select{
    background: ${theme.light.backgroundGrey};
    padding: 1rem;
  }
  .reports{
    padding-top:0.2rem;
  }
`
