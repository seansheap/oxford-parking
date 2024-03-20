import styled from "styled-components";
import theme from "../../../styles/theme";

export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 60vh;
  padding: 0 3rem;
  @media (max-width: ${theme.breakpoints.md + "px"}) {
    padding: 0rem;
  }

  background: ${theme.light.background};
`