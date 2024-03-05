import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import db from "../firebase/config";
const collectionLocations = collection(db, 'locations');


export const AddLocationToFirestore = createAsyncThunk(
  'locations/addLocation',
  async (location: LocationItem) => {
    const addLocationRef = await addDoc(collectionLocations, location)
    const newLocation = { ...location, id: addLocationRef.id }
    return newLocation;
  }
)

export const EditLocationToFirestore = createAsyncThunk(
  'locations/editLocation',
  async (location: LocationItem) => {
    const docLocation = doc(db, `locations/${location.id}`);
    await setDoc(docLocation, location)
    return location;
  }
)

export const FetchLocationsFromFirestore = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    const snapshotLocations = await getDocs(collectionLocations);
    return snapshotLocations.docs.map((doc: any) => { return { ...doc.data(), id: doc.id } })
  }
)
export const AddReportLocationinFirestore = createAsyncThunk(
  'locations/reportLocation',
  async (location: LocationItem) => {
    const docLocation = doc(db, `locations/${location.id}`);
    await setDoc(docLocation, { ...location, reports: location.reports + 1 })
    return location;
  }
)
export const ClearReportLocationinFirestore = createAsyncThunk(
  'locations/clearReports',
  async (location: LocationItem) => {
    const docLocation = doc(db, `locations/${location.id}`);
    await setDoc(docLocation, { ...location, reports: 0 })
    return location;
  }
)



interface LocationState {
  locations: LocationItem[],
  focusedLocation: LocationItem,
  loading: 'idle' | 'pending' | 'suceed' | 'fail'
}
export interface LocationItem {
  id: string;
  location: string;
  longlat: any[];
  spaceCount: number;
  tempLimit: number;
  area: boolean;
  reports: number;
  parkingCode?: string;
  freeStart?: string;
  pricePerHour?: number;
}

const initialState: LocationState = {
  locations: [
  ],
  focusedLocation: {
    id: '',
    location: '',
    longlat: [],
    spaceCount: 0,
    tempLimit: 0,
    area: false,
    reports: 0,
  },
  loading: 'idle'
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setFocusedLocationById(state, action: PayloadAction<string>) {
      state.focusedLocation = state.locations.find(location => location.id === action.payload) || state.focusedLocation
    },
    setFocusedLocation(state, action: PayloadAction<LocationItem>) {
      state.focusedLocation = action.payload
    },

    deleteLocation(state, action: PayloadAction<LocationItem>) {
      state.locations = state.locations.filter(location => location.id !== action.payload.id)
    }

  },
  extraReducers: (builder) => {
    builder.addCase(FetchLocationsFromFirestore.fulfilled, (state, action) => {
      state.locations = action.payload;
    })
    builder.addCase(AddLocationToFirestore.fulfilled, (state, action) => {
      state.locations = [...state.locations, action.payload]
    })
    builder.addCase(EditLocationToFirestore.fulfilled, (state, action) => {
      state.locations = state.locations.map(location => location.id === action.payload.id ? action.payload : location)
    })
    builder.addCase(ClearReportLocationinFirestore.fulfilled, (state, action) => {
      state.locations = state.locations.map(location => location.id === action.payload.id ? action.payload : location)
    })
    builder.addCase(AddReportLocationinFirestore.fulfilled, (state, action) => {
      state.locations = state.locations.map(location => location.id === action.payload.id ? action.payload : location)
    })

  }

});

export const { setFocusedLocation, deleteLocation, setFocusedLocationById } = locationSlice.actions;
export default locationSlice.reducer;