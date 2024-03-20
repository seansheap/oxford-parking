import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../Redux/hooks";
import { LocationItem, RetrictionTimes } from "../../../features/locations";
import { startEndtoComparable } from "./MapGoogle.util";
import { checkFreeUntil } from "./locationList.util";

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

  useEffect(() => {
    switch (searchParams?.get("q")) {
      case "free-30":
        setFilteredlocations(locations.filter((item) => checkFreeUntil(item) >= 0.5))
        break
      case "free-60":
        setFilteredlocations(locations.filter((item) => checkFreeUntil(item) >= 1))
        break
      case "free-120":
        setFilteredlocations(locations.filter((item) => checkFreeUntil(item) >= 2))
        break
      case "free-180":
        setFilteredlocations(locations.filter((item) => checkFreeUntil(item) >= 3))
        break
      case "pay-locations":
        setFilteredlocations(locations.filter((item) => item.pay !== undefined))
        break
      case "free-at":
        const time = searchParams?.get("t")
        if (time) {
          setFilteredlocations(locations.filter((item) => item.visit !== undefined && checkFreeUntil(item)))
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