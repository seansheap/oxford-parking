import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { setFocusedLocationById } from '../../../features/locations';
import { useLocationList } from "./useLocationList";


interface useGoogleMapProps {
  parseCoords?: Function;
  editParking?: Function;
}
// const MarkerRegion = ({ text, onClick }: Marker) => <div onClick={() => onClick()} style={{ width: '100%', height: '100%' }}>{text}</div>;

export const useGoogleMap = ({ parseCoords }: useGoogleMapProps) => {
  const defaultProps = {
    center: {
      lat: 51.7520,
      lng: -1.2577
    },
    zoom: 14
  };
  const focusLocation = useAppSelector((state) => state.locations.focusedLocation)
  const focuslocationLngLat = focusLocation?.longlat ? focusLocation?.longlat.length > 1 ? focusLocation.longlat[Math.floor(focusLocation.longlat.length / 2)] : focusLocation.longlat[0] : undefined


  const [cordinates, setCordinates] = useState(defaultProps.center);
  const [zoom, setZoom] = useState(defaultProps.zoom);

  useEffect(() => {

    if (focuslocationLngLat?.lat) {
      setZoom(17)

      setCordinates(focuslocationLngLat);

      setTimeout(() => focusLocation.longlat.length > 1 ? setZoom(17) : setZoom(16), 300)
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

  return ({
    defaultProps,
    focusLocation,
    isLoading,
    locations,
    selectedPoint,
    mapClick,
    regionSelected,
    cordinates,
    zoom
  }
  )
}