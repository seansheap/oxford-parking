import GoogleMapReact from 'google-map-react';
import { FC } from "react";
import Filters from '../Filters/Filters';
import KeyExplain from '../KeyExplain/KeyExplain';
import SearchBar from '../SearchBar/SearchBar';
import LocationPin from './LocationMarker';
import { MapWrapper } from './MapGoogle.styled';
import { handleApiLoaded } from './MapGoogle.util';
import { useGoogleMap } from './useMapGoogle';


interface LocationProps {
  parseCoords?: Function;
  editParking?: Function;
}

export const GoogleMap: FC<LocationProps> = ({ parseCoords, editParking }) => {

  const { defaultProps, isLoading, locations, regionSelected, focusLocation, mapClick, cordinates, zoom, selectedPoint } = useGoogleMap({ parseCoords })

  if (isLoading) {
    return <div data-testid="map-loading">Loading...</div>
  }

  return (
    <MapWrapper >
      <SearchBar data-testid="search-bar" />

      {!parseCoords &&
        <div className='map--top-bar'>
          <Filters />
          <KeyExplain />
        </div>
      }
      <GoogleMapReact
        data-testid="map"
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY || '' }}
        defaultZoom={defaultProps.zoom}
        zoom={zoom}
        center={cordinates}
        onClick={mapClick}
        yesIWantToUseGoogleMapApiInternals //this is important!
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(locations, regionSelected, map, maps)}
      >
        {focusLocation?.longlat.length === 1 &&
          <LocationPin
            lat={focusLocation.longlat[0].lat}
            lng={focusLocation.longlat[0].lng}
            text=""
            onClick={() => { }}
          />
        }
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
            data-testid="selected-point"
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
export default GoogleMap;