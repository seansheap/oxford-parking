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
  .location-details--button-stack{
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
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