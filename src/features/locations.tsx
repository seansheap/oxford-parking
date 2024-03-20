import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import db from "../firebase/config";
const collectionLocations = collection(db, 'locations');


const emptyPayRestricton: PayRestriction = { activeTimes: [], pricePerHour: 0 }
const emptyPermitRestriction: PermitRestriction = { activeTimes: [], permitCode: '' }
const emptyVisitRestriction: VisitRestriction = { activeTimes: [], limit: 0 }
const fillEmptyValues = (location: LocationItem) => {
  location.pay = location.pay || emptyPayRestricton
  location.permit = location.permit || emptyPermitRestriction
  location.visit = location.visit || emptyVisitRestriction
  return location
}


export const AddLocationToFirestore = createAsyncThunk(
  'locations/addLocation',
  async (location: LocationItem) => {
    try {
      const completeLocation = fillEmptyValues(location)
      const addLocationRef = await addDoc(collectionLocations, location)
      const newLocation = { ...completeLocation, id: addLocationRef.id }
      return newLocation;
    } catch (error) {
      console.error("writeToDB failed. reason :", error)
      return null;
    }
  }
)

export const EditLocationToFirestore = createAsyncThunk(
  'locations/editLocation',
  async (location: LocationItem) => {
    try {
      const completeLocation = fillEmptyValues(location)
      const docLocation = doc(db, `locations/${location.id}`);
      await setDoc(docLocation, completeLocation)
      return location;
    } catch (error) {
      console.error("writeToDB failed. reason :", error)
      return null;
    }
  }
)

export const FetchLocationsFromFirestore = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    try {
      const snapshotLocations = await getDocs(collectionLocations);
      return snapshotLocations.docs.map((doc: any) => { return { ...doc.data(), id: doc.id } })
    } catch (error) {
      console.error("writeToDB failed. reason :", error)
      return null;
    }
  }
)
export const AddReportLocationinFirestore = createAsyncThunk(
  'locations/reportLocation',
  async (location: LocationItem) => {
    try {

      const docLocation = doc(db, `locations/${location.id}`);
      await setDoc(docLocation, { ...location, reports: location.reports + 1 })
      return location;
    } catch (error) {
      console.error("writeToDB failed. reason :", error)
      return null;
    }
  }
)
export const ClearReportLocationinFirestore = createAsyncThunk(
  'locations/clearReports',
  async (location: LocationItem) => {
    try {

      const docLocation = doc(db, `locations/${location.id}`);
      await setDoc(docLocation, { ...location, reports: 0 })
      return location;
    } catch (error) {
      console.error("writeToDB failed. reason :", error)
      return null;
    }
  }
)



interface LocationState {
  locations: LocationItem[],
  focusedLocation: LocationItem,
  loading: 'idle' | 'pending' | 'suceed' | 'fail'
}

export interface LongLat {
  lat: number;
  lng: number;
}
export interface RetrictionTimes {
  start: string;
  end: string;
}
export interface PermitRestriction {
  activeTimes: RetrictionTimes[];
  permitCode: string;
}
export interface VisitRestriction {
  activeTimes: RetrictionTimes[];
  limit: number;
}
export interface PayRestriction {
  activeTimes: RetrictionTimes[];
  pricePerHour: number;

}
export interface LocationItem {
  id: string;
  location: string;
  longlat: LongLat[];
  spaceCount: number;
  area: boolean;
  reports: number;
  permit?: PermitRestriction;
  pay?: PayRestriction;
  visit?: VisitRestriction;
}

const initialState: LocationState = {
  locations: [
  ],
  focusedLocation: {
    id: '',
    location: '',
    longlat: [],
    spaceCount: 0,
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
      if (action.payload) {
        state.locations = action.payload;
      }
    })
    builder.addCase(AddLocationToFirestore.fulfilled, (state, action) => {
      if (action.payload) {
        state.locations = [...state.locations, action.payload]
      }
    })
    builder.addCase(EditLocationToFirestore.fulfilled, (state, action) => {
      if (action.payload) {
        state.locations = state.locations.map(location => location.id === action.payload?.id ? action.payload : location)
      }
    })
    builder.addCase(ClearReportLocationinFirestore.fulfilled, (state, action) => {
      if (action.payload) {
        state.locations = state.locations.map(location => location.id === action.payload?.id ? action.payload : location)
      }
    })
    builder.addCase(AddReportLocationinFirestore.fulfilled, (state, action) => {
      if (action.payload) {
        state.locations = state.locations.map(location => location.id === action.payload?.id ? action.payload : location)
      }
    })

  }

});

export const { setFocusedLocation, deleteLocation, setFocusedLocationById } = locationSlice.actions;
export default locationSlice.reducer;