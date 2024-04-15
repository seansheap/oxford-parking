import { ClickEventValue } from "google-map-react";
import { useState } from "react";
import GoogleMap from "../../common/components/MapGoogle/MapGoogle";
import RegionDefiner from "../../common/components/RegionDefiner/RegionDefiner";
import { MainWrapperH, SectionWrapper } from "../../common/components/SectionWrapper.styled";

const AddParking = () => {

  const [selectedLngLat, setSelectedLngLat] = useState({ lng: 0, lat: 0 });
  return (
    <>
      <SectionWrapper>
        <RegionDefiner selectedLngLat={selectedLngLat} />
        <MainWrapperH>
          <GoogleMap parseCoords={(e: ClickEventValue) => setSelectedLngLat({ lng: e.lng, lat: e.lat })} />
        </MainWrapperH>
      </SectionWrapper>
    </>
  )
};

export default AddParking;