import styled from "styled-components";


export const MainWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex ;
  justify-content: center ;
`
export const MapWrapper = styled.div`
  height: 70vh;
  width: 100%;
  max-height: 70rem;
  .map--top-bar{
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    height: 6rem;

  }
`
export const MarkerCorner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: salmon;
`
export const MarkerWrapper = styled.div`
  font-size: 1rem;
  color: red;
  pointer-events: none;
  position: relative;
  
`