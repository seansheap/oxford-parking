import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useViewport } from "../../../Redux/hooks";
import { AddLocationToFirestore, EditLocationToFirestore, PayRestriction, PermitRestriction, VisitRestriction } from "../../../features/locations";
import { HorizontalWrapper } from "../../wrapper";
import LocationDetailsRestrictions from "./LocationDetailsRestrictions";

interface Props {
  mode: boolean;
  selectedLngLat: { lng: number; lat: number };
}

const LocationDetailsEdit: React.FC<Props> = ({ mode, selectedLngLat }) => {
  const selectedLocation = useAppSelector((state) => state.locations.focusedLocation)
  const [location, setLocation] = useState(selectedLocation.location || "")
  const [longlat, setLonglat] = useState(selectedLocation.longlat || [])
  const [spaceCount, setSpaceCount] = useState(selectedLocation.spaceCount || 0)
  const [visit, setVisit] = useState<VisitRestriction | undefined>(selectedLocation.visit)
  const [permit, setPermit] = useState<PermitRestriction | undefined>(selectedLocation.permit)
  const [pay, setPay] = useState<PayRestriction | undefined>(selectedLocation.pay)
  const [area, setArea] = useState(selectedLocation.area || false)
  const [reports, setReports] = useState(selectedLocation.reports || 0)
  const [section, setSection] = useState(0)
  const { minWidth } = useViewport();
  const mobile = minWidth({ size: 'lg' })

  const dispatch = useAppDispatch()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submitting', location, longlat, spaceCount, visit, permit, pay, area, reports);
    event.preventDefault();

    if (mode) {
      dispatch(AddLocationToFirestore({ id: '0', location, longlat, spaceCount, visit, permit, pay, area, reports }));
    } else {
      dispatch(EditLocationToFirestore({ id: selectedLocation.id, location, longlat, spaceCount, visit, permit, pay, area, reports }))
    }
    editDataSet()
  }


  const editDataSet = () => {
    if (mode) {
      setLocation("")
      setLonglat([])
      setSpaceCount(0)
      setVisit(undefined)
      setPermit(undefined)
      setPay(undefined)
      setArea(false)
      setReports(0)

    } else {
      setLocation(selectedLocation.location)
      setLonglat(selectedLocation.longlat)
      setSpaceCount(selectedLocation.spaceCount)
      setVisit(selectedLocation.visit)
      setPermit(selectedLocation.permit)
      setPay(selectedLocation.pay)
      setArea(selectedLocation.area)
      setReports(selectedLocation.reports)
    }
    setSection(0)
  }

  useEffect(() => {
    editDataSet()
  }, [mode, selectedLocation, selectedLocation.location])


  if (!mode && !selectedLocation.id) return <div>Select a paraking region</div>

  const sectionOne = () => {
    return (
      <div>
        <label htmlFor="location">Location</label>
        <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} value={location || ""} placeholder="location" />
        <label htmlFor="spaceCount">Space Count</label>
        <input type="number" name="spaceCount" onChange={(e) => setSpaceCount(Number(e.target.value))} value={spaceCount || ""} placeholder="1" />
      </div>)
  }
  const sectionTwo = () => {
    return (
      <div>
        <LocationDetailsRestrictions setVisit={setVisit} setPermit={setPermit} setPay={setPay} pay={pay} permit={permit} visit={visit} />
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



  if (!mode && !selectedLocation.id) return <div>Select a parking region</div>
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
      <form onSubmit={handleSubmit}>
        <HorizontalWrapper>
          {mobile ?
            mobileActiveSection() :
            desktopActiveSection()
          }

        </HorizontalWrapper>
      </form>

      {mobile &&
        <HorizontalWrapper>
          <button disabled={section === 0} type="button" onClick={() => setSection(section - 1)}> <span>&#9668;</span> </button>
          <button disabled={section === 2} type="button" onClick={() => setSection(section + 1)}><span>&#9658;</span>  </button>
        </HorizontalWrapper>
      }
    </div>

  )
}

export default LocationDetailsEdit;