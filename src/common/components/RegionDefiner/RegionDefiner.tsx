import { useState } from "react";
import LocationDetailsEdit from "../LocationDetails/LocationDetailsEdit";
import { EditParamsWrapper, ModeWrapper, RegionWrapper } from "./RegionDefiner.styled";
import ModeSelect from "./ModeSelect";

interface Props {
  selectedLngLat: { lng: number; lat: number };
}

const RegionDefiner = ({ selectedLngLat }: Props) => {
  const [AddMode, setAddMode] = useState(false);

  return (
    <RegionWrapper>
      <ModeWrapper>
        <ModeSelect AddMode={AddMode} setAddMode={setAddMode} />
      </ModeWrapper>
      <EditParamsWrapper>
        <LocationDetailsEdit selectedLngLat={selectedLngLat} addMode={AddMode} />
      </EditParamsWrapper>
    </RegionWrapper>
  )
}

export default RegionDefiner;