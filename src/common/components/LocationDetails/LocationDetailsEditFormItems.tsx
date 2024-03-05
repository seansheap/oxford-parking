import { useEffect, useState } from "react";
import { useAppSelector, useViewport } from "../../../Redux/hooks";
import { HorizontalWrapper } from "../../wrapper";

interface Props {
  mode: boolean;
  selectedLngLat: { lng: number; lat: number };
}

const LocationDetailsEditFormItems: React.FC<Props> = ({ mode, selectedLngLat }) => {
  const selectedLocation = useAppSelector((state) => state.locations.focusedLocation)
  const [location, setLocation] = useState(selectedLocation.location || "")
  const [longlat, setLonglat] = useState(selectedLocation.longlat || [])
  const [spaceCount, setSpaceCount] = useState(selectedLocation.spaceCount || 0)
  const [tempLimit, setTempLimit] = useState(selectedLocation.tempLimit || 0)
  const [parkingCode, setParkingCode] = useState(selectedLocation.parkingCode || "")
  const [freeStart, setFreeStart] = useState(selectedLocation.freeStart)
  const [pricePerHour, setPricePerHour] = useState(selectedLocation.pricePerHour || 0)
  const [area, setArea] = useState(selectedLocation.area || false)
  const [reports, setReports] = useState(selectedLocation.reports || 0)
  const [section, setSection] = useState(0)
  const { minWidth } = useViewport();
  const mobile = minWidth({ size: 'lg' })

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


  const HandleFreeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreeStart(event.target.value)
  }
  if (!mode && !selectedLocation.id) return <div>Select a paraking region</div>


  const sectionOne = () => {
    return (
      <div>
        <label htmlFor="location">Location</label>
        <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} value={location || ""} placeholder="location" />
        <label htmlFor="spaceCount">Space Count</label>
        <input type="number" name="spaceCount" onChange={(e) => setSpaceCount(Number(e.target.value))} value={spaceCount || ""} placeholder="1" />
        <label htmlFor="tempLimit">Visit Stay Limit</label>
        <input type="number" name="tempLimit" onChange={(e) => setTempLimit(Number(e.target.value))} value={tempLimit || ""} placeholder="1" />
      </div>)
  }
  const sectionTwo = () => {
    return (
      <div>
        <label htmlFor="parkingCode">Parking Code</label>
        <input type="text" name="parkingCode" onChange={(e) => setParkingCode(e.target.value)} value={parkingCode || ""} placeholder="---" />
        <label htmlFor="freeStart">Free Parking Start Time</label>
        <input type="time" name="freeStart" onChange={HandleFreeStart} value={freeStart || ""} placeholder="0" />
        <label htmlFor="pricePerHour">Price Per Hour</label>
        <input type="number" name="pricePerHour" onChange={(e) => setPricePerHour(Number(e.target.value))} value={pricePerHour || ""} placeholder="0" />
      </div>)
  }

  const sectionThree = () => {
    return (
      <HorizontalWrapper>
        <div>
          <HorizontalWrapper>
            <label htmlFor="area">Area</label>
            <input type="checkbox" name="area" onChange={(e) => setArea(e.target.checked)} checked={area} placeholder="---" />
          </HorizontalWrapper>
          <div className="location-details--button-stack">
            {longlat.map((item, idx) => (
              <div key={idx}>
                <button type="button" onClick={() => setLonglat([...longlat.slice(0, idx), ...longlat.slice(idx + 1)])}>Delete {idx}</button>
              </div>
            ))}
            <button type="button" onClick={() => setLonglat([...longlat, { ...selectedLngLat }])}>Add Marker</button>
          </div>


        </div>
        <button type="submit">Submit</button>
      </HorizontalWrapper>

    )
  }

  const mobileActiveSection = () => {
    switch (section) {
      case 0:
        return sectionOne()
      case 1:
        return sectionTwo()
      case 2:
        return sectionThree()
      default:
        return sectionOne()
    }
  }

  const desktopActiveSection = () => {
    return (
      <HorizontalWrapper>
        {sectionOne()}
        {sectionTwo()}
        {sectionThree()}
      </HorizontalWrapper>
    )
  }

  return (
    <div>
      <HorizontalWrapper>
        {mobile ?
          mobileActiveSection() :
          desktopActiveSection()
        }

      </HorizontalWrapper>
      {mobile &&
        <HorizontalWrapper>
          <button disabled={section === 0} type="button" onClick={() => setSection(section - 1)}> <span>&#9668;</span> </button>
          <button disabled={section === 2} type="button" onClick={() => setSection(section + 1)}><span>&#9658;</span>  </button>
        </HorizontalWrapper>
      }
    </div>
  )
}

export default LocationDetailsEditFormItems;