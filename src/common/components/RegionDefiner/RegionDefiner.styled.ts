import styled from "styled-components";
import theme from "../../../styles/theme";

export const EditParamsWrapper = styled.section`
  margin: 1rem;

  @media (max-width: ${theme.breakpoints.md + "px"}) {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  form{
    
    div{
      width: 100%;
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
  padding: 1rem;


  @media (max-width: ${theme.breakpoints.lg + "px"}) {
    flex-direction: column;
  }
  @media (max-width: ${theme.breakpoints.md + "px"}) {
    margin: 0;
    padding: 0;
  }
  gap: 2rem;
  background: ${theme.light.background};
  .mode-select{
    background: ${theme.light.backgroundGrey};
    padding: 1rem;
  }
  .reports{
    padding-top:0.2rem;
  }
`
