
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../Redux/hooks";
import { FetchLocationsFromFirestore } from "../features/locations";
import AddParking from "./pages/AddParking";
import Home from "./pages/Home";
import Layout from "./pages/Layout/Layout";
import ViewParking from "./pages/ViewParking";


const RouteList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchLocationsFromFirestore())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="add-parking" element={<AddParking />} />
        <Route path="parking" element={<ViewParking />} />
      </Route>
    </Routes>
  )
}

export default RouteList;
