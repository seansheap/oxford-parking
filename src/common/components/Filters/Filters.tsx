import { useState } from "react";
import { useAppDispatch, useAppSelector, useViewport } from "../../../Redux/hooks";
import { AddReportLocationinFirestore } from "../../../features/locations";
import { useLocationList } from "../MapGoogle/useLocationList";
import { FitterWrapper } from "./Filters.styled";

interface Props {

}

const Filters = ({ }: Props) => {
  const [open, setOpen] = useState(false)
  const { addFilter, clearFilters } = useLocationList()
  const focuslocation = useAppSelector((state) => state.locations.focusedLocation.longlat[0])
  const { minWidth } = useViewport();
  const mobile = minWidth({ size: 'md' })

  const dispatch = useAppDispatch()
  const reportSelected = () => {
    dispatch(AddReportLocationinFirestore(focuslocation))
  }
  return (
    <FitterWrapper>
      <div className="filter--title-wrapper">
        <h1>Filters</h1>
        <button onClick={() => setOpen(!open)}> {open ? "-" : "+"} </button>
      </div>
      {open &&
        <div className={!mobile ? 'filter--button-wrapper' : 'filter--button-wrapper-mobile'}>
          <button className="filter--button" onClick={clearFilters}>All</button>
          <button className="filter--button" onClick={() => addFilter("free-now")}>Free Now</button>
          <button className="filter--button" onClick={() => addFilter("pay-locations")}>Pay Locations</button>
          <button className="filter--button" onClick={reportSelected}>Report</button>
        </div>
      }
    </FitterWrapper>
  )
}

export default Filters;