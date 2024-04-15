import { useAppDispatch } from "../../../Redux/hooks";
import { LocationItem, setFocusedLocationById } from "../../../features/locations";
import { ItemWrapper } from "./LocationDetails.styled";
import { activeTimesToDays } from "./Restriction.util";

interface Props {
  selected: boolean;
  locationData: LocationItem;
  scrollToTop: () => void;
}

const LocationDetails = ({ selected, locationData, scrollToTop }: Props) => {

  const { location, id, longlat, spaceCount, pay, free, permit, visit } = locationData
  const dispatch = useAppDispatch()
  const onClick = () => { scrollToTop(); dispatch(setFocusedLocationById(id)) };
  const day = new Date().getDay();
  const visitDays = activeTimesToDays(visit?.activeTimes || []);
  const permitDays = activeTimesToDays(permit?.activeTimes || []);
  const payDays = activeTimesToDays(pay?.activeTimes || []);
  const freeDays = activeTimesToDays(free?.activeTimes || []);
  const longlatString = longlat[0]?.lat ? `${longlat[Math.floor(longlat.length / 2)]?.lat.toFixed(7)},${longlat[Math.floor(longlat.length / 2)]?.lng.toFixed(7)}` : ''
  return (
    <ItemWrapper $selected={selected} onClick={onClick}>
      <h4>{location || "Location"}</h4>
      <p>Parking Count:{spaceCount || "1"}</p>
      {locationData.visit?.limit ? <div> <p>Visiting Limit:{locationData.visit.limit || "NA"} </p><p> {visitDays.start[day]} - {visitDays.end[day]}</p></div> : null}
      {locationData.permit?.permitCode ?
        locationData.free ?
          <div> <p>Permit Code:{locationData.permit.permitCode || "NA"}  </p><p>{permitDays.start[day]} - {freeDays.start[day]} </p> <p> {freeDays.end[day]} - {permitDays.end[day]}</p></div>
          : <div> <p>Permit Code:{locationData.permit.permitCode || "NA"}  </p><p>{permitDays.start[day]} - {permitDays.end[day]}</p></div>
        : null}
      {locationData.pay?.pricePerHour ? <div><p>Price Per Hour:{locationData.pay.pricePerHour || "NA"} </p><p> {payDays.start[day]} - {payDays.end[day]}</p></div> : null}
      {longlat[0]?.lat && longlat[0]?.lng && <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir//${longlatString}/@${longlatString},20z`}>Google Maps</a>}
    </ItemWrapper>
  )
}

export default LocationDetails;