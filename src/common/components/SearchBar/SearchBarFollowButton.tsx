import { useEffect } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import { GpsIcon } from "../../../assets/Icons/gps-icon/gps-icon";
import { setFocusedLocation } from "../../../features/locations";

interface FollowButtonProps {
  following: boolean
  setFollowing: Function
}

const SearchBarFollowButton: React.FC<FollowButtonProps> = ({ following, setFollowing }) => {
  const dispatch = useAppDispatch()

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch(setFocusedLocation({
            id: 'current location',
            location: "",
            longlat: [pos],
            spaceCount: 0,
            area: false,
            reports: 0
          }))
        },
        () => {
          alert("Geolocation error.");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    if (following) { getLocation() }
    const intervalId = setInterval(() => {
      if (following) {
        getLocation()
      }
    }, 10000);

    return () => clearInterval(intervalId);

  }, [following]);




  return (
    <button className="search-bar--button" onClick={() => setFollowing(!following)}> <GpsIcon active={following} /> </button>
  )
}

export default SearchBarFollowButton;