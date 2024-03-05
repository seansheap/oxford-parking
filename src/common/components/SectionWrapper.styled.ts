import styled from "styled-components";
import theme from "../../styles/theme";


export const MainWrapperH = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`
export const MainWrapperV = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 2rem;
  background: white;
`

export const AsideWrapper = styled.aside`
  @media (max-width: ${theme.breakpoints.md + "px"}) {
    padding-top: 4rem;
  }
  display: flex;
  flex-direction: column;
  background: ${theme.light.background};
  max-height: 50%;
  overflow-y: auto;
  gap: 0.5rem;
`