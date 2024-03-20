import GoogleMapReact from 'google-map-react';
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { LocationItem, setFocusedLocationById } from '../../../features/locations';
import { useLocationList } from "./useLocationList";
import Filters from '../Filters/Filters';
import { MainWrapper, MapWrapper } from './MapGoogle.styled';
import LocationPin from './LocationMarker';
import { handleApiLoaded } from './MapGoogle.util';
import KeyExplain from '../KeyExplain/KeyExplain';


interface LocationProps {
  focus?: {
    lng: number;
    lat: number;
  }
  parseCoords?: Function;
  editParking?: Function;
}
// const MarkerRegion = ({ text, onClick }: Marker) => <div onClick={() => onClick()} style={{ width: '100%', height: '100%' }}>{text}</div>;

const SimpleMap: FC<LocationProps> = ({ focus, parseCoords, editParking }) => {
  const defaultProps = {
    center: {
      lat: 51.7520,
      lng: -1.2577
    },
    zoom: 15
  };
  const focusLocation = useAppSelector((state) => state.locations.focusedLocation)
  const focuslocationLngLat = focusLocation.longlat[0]


  const [cordinates, setCordinates] = useState(defaultProps.center);

  useEffect(() => {
    if (focuslocationLngLat?.lat) {
      setCordinates(focuslocationLngLat);
    } else {
      setCordinates(defaultProps.center);
    }
  }, [focuslocationLngLat?.lat])


  const dispatch = useAppDispatch()
  const regionSelected = (itemId: string) => {
    dispatch(setFocusedLocationById(itemId))
  }


  const [selectedPoint, setSelectedPoint] = useState({ lat: 0, lng: 0 })

  const mapClick = (e: GoogleMapReact.ClickEventValue) => {
    setSelectedPoint({ lat: e.lat, lng: e.lng })
    parseCoords && parseCoords(e)
  }

  const { isLoading, locations } = useLocationList()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <MapWrapper >
      <div className='map--top-bar'>
        <Filters />
        <KeyExplain />
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDHDVhLcShVWKXra5JfEJqkl5YNDR1DeU4" }}
        defaultZoom={defaultProps.zoom}
        center={cordinates}
        onClick={mapClick}
        yesIWantToUseGoogleMapApiInternals //this is important!
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(locations, regionSelected, map, maps)}
      >

        {focusLocation && parseCoords &&
          focusLocation.longlat.map((item, idx) => (
            <LocationPin
              lat={item.lat} lng={item.lng}
              text={String(idx)}
              key={idx}
              onClick={() => { }}
            />
          ))}
        {parseCoords &&
          <LocationPin
            lat={selectedPoint.lat}
            lng={selectedPoint.lng}
            text="*"
            onClick={() => { }}
          />
        }
      </GoogleMapReact>
    </MapWrapper>
  );
}
export default SimpleMap;