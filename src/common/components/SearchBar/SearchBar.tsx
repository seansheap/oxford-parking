import { useEffect, useState } from "react";
import { useAppDispatch, useDebounce } from "../../../Redux/hooks";
import { setFocusedLocation } from "../../../features/locations";
import { SearchBarWrapper } from "./SearchBar.styled";
import SearchBarFollowButton from "./SearchBarFollowButton";
import useGeocode, { Place } from "./useGeocode";


const SearchBar = () => {
  const dispatch = useAppDispatch()
  const geocode = useGeocode();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 1500);
  const [following, setFollowing] = useState(false)

  const clickSearchTerm = (location: Place) => {
    setFollowing(false)
    setSearchFocused(false)
    dispatch(setFocusedLocation({
      id: location.id,
      location: "",
      longlat: [{ lat: location.location.latitude, lng: location.location.longitude }],
      spaceCount: 0,
      area: false,
      reports: 0
    }))
  }

  useEffect(() => {
    geocode.setSearchTerm(debouncedValue);
  }, [debouncedValue,]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event: any) => {
    // Check if the click event target is not the search input or the suggestion list
    if (!event?.target?.closest('.search-input') && !event?.target?.closest('.suggestion-list')) {
      setSearchFocused(false);
    } else {
      setFollowing(false)
      setSearchFocused(true)
    }
  };

  return (
    <SearchBarWrapper>
      <div className="searchBar">
        <input className="search-input" onFocus={() => setSearchFocused(true)} role="search"
          type="text" placeholder="Search Oxford" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ></input>
        <SearchBarFollowButton following={following} setFollowing={setFollowing} />
      </div>
      {searchFocused &&
        <div className="searchBar--results-list">
          {geocode.locationList.map((result: Place) => <div className="searchBar--results-item" onClick={() => clickSearchTerm(result)} key={result.id}>{result.displayName.text}</div>)}
        </div>
      }
    </SearchBarWrapper>
  )
}

export default SearchBar;