import GoogleMapReact from 'google-map-react';
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { setFocusedLocationById } from '../../../features/locations';
import { useLocationList } from "./useLocationList";
import Filters from '../Filters/Filters';

interface Marker {
  onClick: Function;
  text: string;
  lng: number;
  lat: number;
}
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
  const focuslocation = useAppSelector((state) => state.locations.focusedLocation.longlat[0])

  const [cordinates, setCordinates] = useState(defaultProps.center);

  useEffect(() => {
    if (focuslocation?.lat) {
      setCordinates(focuslocation);
    } else {
      setCordinates(defaultProps.center);
    }
  }, [focuslocation?.lat])


  const dispatch = useAppDispatch()
  const regionSelected = (itemId: string) => {
    dispatch(setFocusedLocationById(itemId))
  }
  const LocationPin = ({ text }: Marker) => (
    <div className="pin" style={{ fontSize: '1rem', color: 'red', pointerEvents: 'none' }}>
      *
    </div>
  )

  const handleApiLoaded = (map: any, maps: any) => {
    locations.forEach((item) => {
      const itemAndLongLat = [...item.longlat, ...item.longlat.slice().reverse()];
      const colour = item.tempLimit ? '#0000FF' : item.parkingCode ? '#FF0000' : item.pricePerHour ? '#FFFF00' : '#00FF00'
      new maps.Polygon({
        paths: item.area ? item.longlat : itemAndLongLat,
        strokeColor: colour,
        strokeOpacity: 0.6,
        strokeWeight: 5,
        clickable: true,
        map: map,
      }).addListener('click', () => regionSelected(item.id));

    })
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
    <div style={{ height: '100vw', width: '100%' }}>
      <Filters />
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDHDVhLcShVWKXra5JfEJqkl5YNDR1DeU4" }}
        defaultZoom={defaultProps.zoom}
        center={cordinates}
        onClick={mapClick}
        yesIWantToUseGoogleMapApiInternals //this is important!
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {parseCoords &&
          <LocationPin
            lat={selectedPoint.lat}
            lng={selectedPoint.lng}
            text=""
            onClick={() => { }}
          />
        }
      </GoogleMapReact>
    </div>
  );
}
export default SimpleMap;