import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { AddLocationToFirestore, EditLocationToFirestore } from "../../../features/locations";
import { HorizontalWrapper } from "../../wrapper";
import LocationDetailsEditFormItems from "./LocationDetailsEditFormItems";

interface Props {
  mode: boolean;
  selectedLngLat: { lng: number; lat: number };
}

const LocationDetailsEdit: React.FC<Props> = ({ mode, selectedLngLat }) => {
  const selectedLocation = useAppSelector((state) => state.locations.focusedLocation)
  // const [id, setId] = React.useState(selectedLocation.id || "")
  const [location, setLocation] = useState(selectedLocation.location || "")
  const [longlat, setLonglat] = useState(selectedLocation.longlat || [])
  const [spaceCount, setSpaceCount] = useState(selectedLocation.spaceCount || 0)
  const [tempLimit, setTempLimit] = useState(selectedLocation.tempLimit || 0)
  const [parkingCode, setParkingCode] = useState(selectedLocation.parkingCode || "")
  const [freeStart, setFreeStart] = useState(selectedLocation.freeStart)
  const [pricePerHour, setPricePerHour] = useState(selectedLocation.pricePerHour || 0)
  const [area, setArea] = useState(selectedLocation.area || false)
  const [reports, setReports] = useState(selectedLocation.reports || 0)


  useEffect(() => {
    if (mode) {
      setLocation("")
      setLonglat([])
      setSpaceCount(0)
      setTempLimit(0)
      setParkingCode("")
      setFreeStart(undefined)
      setPricePerHour(0)
      setArea(false)
      setReports(0)

    } else {
      setLocation(selectedLocation.location)
      setLonglat(selectedLocation.longlat)
      setSpaceCount(selectedLocation.spaceCount)
      setTempLimit(selectedLocation.tempLimit)
      setParkingCode(selectedLocation.parkingCode || "")
      setFreeStart(selectedLocation.freeStart)
      setPricePerHour(selectedLocation.pricePerHour || 0)
      setArea(selectedLocation.area)
      setReports(selectedLocation.reports)
    }

  }, [mode, selectedLocation, selectedLocation.location])



  const dispatch = useAppDispatch()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode) {
      // to update, no id
      dispatch(AddLocationToFirestore({ id: '0', location, longlat, spaceCount, tempLimit, parkingCode, freeStart, pricePerHour, area, reports }));
    } else {
      dispatch(EditLocationToFirestore({ id: selectedLocation.id, location, longlat, spaceCount, tempLimit, parkingCode, freeStart, pricePerHour, area, reports }))
    }
  }
  const HandleFreeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreeStart(event.target.value)
  }
  if (!mode && !selectedLocation.id) return <div>Select a paraking region</div>

  return (
    <form onSubmit={handleSubmit}>
      <LocationDetailsEditFormItems mode={mode} selectedLngLat={selectedLngLat} />
    </form>
  )
}

export default LocationDetailsEdit;