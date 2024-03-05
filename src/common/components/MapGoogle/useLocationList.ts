import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../Redux/hooks";
import { LocationItem } from "../../../features/locations";

export const useLocationList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false)
  const [filteredLocations, setFilteredlocations] = useState<LocationItem[]>([])
  const locations = useAppSelector((state) => state.locations.locations)
  const refresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }
  const addFilter = (filter: string, time?: string) => {
    setSearchParams({ q: filter, t: time || "" });
  }

  const checkFreeNow = (item: LocationItem) => {
    if (!item.freeStart) {
      return false
    }
    const time = searchParams?.get("t")
    return new Date(new Date().getTime() - item.tempLimit * 1000 * 60 * 60) < (time ? new Date(time) : new Date(item.freeStart))
  }

  useEffect(() => {
    switch (searchParams?.get("q")) {
      case "free-now":
        setFilteredlocations(locations.filter((item) => item.freeStart !== undefined && checkFreeNow(item)))
        break
      case "pay-locations":
        setFilteredlocations(locations.filter((item) => item.freeStart === undefined))
        break
      case "free-at":
        const time = searchParams?.get("t")
        if (time) {
          setFilteredlocations(locations.filter((item) => item.freeStart !== undefined && checkFreeNow(item)))
        }
        break
      default:
        setFilteredlocations(locations)
        break
    }
    refresh()

  }, [locations, searchParams])
  return {
    locations: filteredLocations,
    isLoading: loading,
    setLoading,
    refresh,
    addFilter,
    clearFilters: () => setSearchParams({}),
  }
}