import { useAppDispatch } from "../../../Redux/hooks";
import { LocationItem, setFocusedLocationById } from "../../../features/locations";
import { ItemWrapper } from "./LocationDetails.styled";

interface Props {
  selected: boolean;
  locationData: LocationItem;
}

const LocationDetails = ({ selected, locationData }: Props) => {
  const { location, id, longlat, spaceCount, pay, permit, visit } = locationData
  let timeAsString24 = null;
  // if (freeStart) {
  //   const time = new Date(`01 Jan 1970 ${freeStart}`);
  //   let hours = time.getHours().toString().padStart(2, '0');
  //   const minutes = time.getMinutes().toString().padStart(2, '0');
  //   if (tempLimit) {
  //     hours = (time.getHours() - tempLimit).toString().padStart(2, '0');
  //   }
  //   timeAsString24 = `${hours}:${minutes}`;
  // }


  const dispatch = useAppDispatch()
  const onClick = () => { dispatch(setFocusedLocationById(id)) };

  return (
    <ItemWrapper $selected={selected} onClick={onClick}>
      <h4>{location || "Location"}</h4>
      <p>Parking Count:{spaceCount || "1"}</p>
      {/* {tempLimit ? <p>Visiting Time Limit:{tempLimit || "NA"}</p> : null}
      {parkingCode ? <p>Permit Code:{parkingCode || "NA"}</p> : null}
      {timeAsString24 ? <p>Free Parking:{timeAsString24 || "NA"}</p> : null}
      {pricePerHour ? <p>Price Per Hour:{pricePerHour || "NA"}</p> : null} */}
      <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/@${longlat[0].lat},${longlat[0].lng}z`}>Google Maps</a>
    </ItemWrapper>
  )
}

export default LocationDetails;