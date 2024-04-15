import { MarkerCorner, MarkerRadius, MarkerWrapper } from "./MapGoogle.styled";

interface Marker {
  onClick: Function;
  text: string;
  lng: number;
  lat: number;
}

const LocationPin = ({ text }: Marker) => {
  return (
    <MarkerWrapper className="pin" >
      {text}
      {text !== "" ? <MarkerCorner className="corner" /> : <MarkerRadius className="corner" />}
    </MarkerWrapper>
  )
}

export default LocationPin;