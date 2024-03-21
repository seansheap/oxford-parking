import styled from "styled-components";
import theme from "../styles/theme";


export const HorizontalWrapper = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-around;
  margin: 0;
  align-items: center;
  background: ${theme.light.background};
  
  gap: 1rem;
  .location-details--section-three{
    min-width: 8rem;
  }
  .location-details--checkbox{
    display: flex !important;
    flex-direction: row !important;
    margin:  0.5rem 0;
    width: fit-content;

  }
  .location-details--button-stack{
    display: grid;
    grid-template-rows: repeat(5, minmax(1rem, 1fr)); /* This line limits to 5 per row */
    grid-auto-flow: column;
    gap: 0.1rem;
    width: max-content;
  }
`

export const HorizontalWrapperMin = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-around;
  align-items: center;
  background: ${theme.light.background};
  gap: 0.1rem;
`


export const HorizontalWrapperBasic = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between;
  margin: 0;
  padding: 0.2rem;
  align-items: center;
  background: ${theme.light.background};
`