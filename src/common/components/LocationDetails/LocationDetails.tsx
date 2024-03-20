import { useAppDispatch } from "../../../Redux/hooks";
import { LocationItem, setFocusedLocationById } from "../../../features/locations";
import { ItemWrapper } from "./LocationDetails.styled";
import { activeTimesToDays } from "./Restriction.util";

interface Props {
  selected: boolean;
  locationData: LocationItem;
}

const LocationDetails = ({ selected, locationData }: Props) => {

  const { location, id, longlat, spaceCount, pay, permit, visit } = locationData
  const dispatch = useAppDispatch()
  const onClick = () => { dispatch(setFocusedLocationById(id)) };
  const day = new Date().getDay();
  const visitDays = activeTimesToDays(visit?.activeTimes || []);
  const permitDays = activeTimesToDays(permit?.activeTimes || []);
  const payDays = activeTimesToDays(pay?.activeTimes || []);

  return (
    <ItemWrapper $selected={selected} onClick={onClick}>
      <h4>{location || "Location"}</h4>
      <p>Parking Count:{spaceCount || "1"}</p>
      {locationData.visit?.limit ? <div> <p>Visiting Limit:{locationData.visit.limit || "NA"} </p><p> {visitDays.start[day]} - {visitDays.end[day]}</p></div> : null}
      {locationData.permit?.permitCode ? <div> <p>Permit Code:{locationData.permit.permitCode || "NA"}  </p><p>{permitDays.start[day]} - {permitDays.end[day]}</p></div> : null}
      {locationData.pay?.pricePerHour ? <div><p>Price Per Hour:{locationData.pay.pricePerHour || "NA"} </p><p> {payDays.start[day]} - {payDays.end[day]}</p></div> : null}
      {longlat[0]?.lat && longlat[0]?.lng && <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/@${longlat[0].lat.toFixed(7)},${longlat[0].lng.toFixed(7)},20z`}>Google Maps</a>}
    </ItemWrapper>
  )
}

export default LocationDetails;