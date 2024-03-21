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
export const HomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: white;
`
export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 2rem;
  background: white;
`

export const AsideWrapper = styled.aside`
  width: 18%;
  min-width: 12rem;


  @media (max-width: ${theme.breakpoints.lg + "px"}) {
    padding-top: 4rem;
    width: 100%;

  }
  display: flex;
  flex-direction: column;
  background: ${theme.light.background};
  max-height: 80vh;
  overflow-y: auto;

  overflow-x: hidden;
  gap: 0.5rem;
`