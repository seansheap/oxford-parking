import { useMemo, useState } from "react";


export interface SearchResult {
  places?: Place[]
}
export interface Place {
  id: string
  displayName: {
    text: string
    languageCode: string
  }
  location: {
    latitude: number
    longitude: number
  }
}

const useGeocode = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locationList, setLocationList] = useState<Place[]>([]);


  const getGeocodeList = async (searchTerm: string) => {
    const response = await fetch(`https://content-places.googleapis.com/v1/places:searchText?fields=places.displayName,places.location,places.id&alt=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.REACT_APP_GOOGLE_API_KEY || ''
      },
      body: JSON.stringify({
        "textQuery": searchTerm,
        "maxResultCount": 8,
        "locationBias": {
          "circle": {
            "center": { "latitude": 51.7520, "longitude": -1.2577 },
            "radius": 5000.0
          }
        },

      })
    });
    if (response.ok) {

      const data = await response.json();
      setLocationList(data.places)
    }
  }
  useMemo(() => {
    setLocationList([])
    if (searchTerm && searchTerm.trim().length > 3) {
      getGeocodeList(searchTerm)
    }
  }, [searchTerm])

  return (
    {
      locationList: locationList,
      setSearchTerm: setSearchTerm,
      searchTerm: searchTerm
    }
  )
}

export default useGeocode;