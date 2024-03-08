import styled from "styled-components";
import theme from "../styles/theme";


export const HorizontalWrapper = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-around;
  margin: 0;
  padding: 0.2rem;
  align-items: center;
  background: ${theme.light.background};
  
  gap: 1rem;
  .location-details--button-stack{
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
`