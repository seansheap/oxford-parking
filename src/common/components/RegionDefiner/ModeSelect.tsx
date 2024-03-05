import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { ClearReportLocationinFirestore } from "../../../features/locations";

interface Props {
  AddMode: boolean;
  setAddMode: Function
}

const ModeSelect = ({ AddMode, setAddMode }: Props) => {
  const selectedLocation = useAppSelector((state) => state.locations.focusedLocation)
  const showReports = selectedLocation.reports > 0 && !AddMode
  const dispatch = useAppDispatch();
  const resetReports = () => {
    dispatch(ClearReportLocationinFirestore(selectedLocation))
  }

  return (
    <div className="mode-select">
      <h2>{!AddMode ? "Edit Parking" : "Add Parking"}</h2>
      <button onClick={() => setAddMode(!AddMode)}>Change Mode</button>
      {showReports &&
        <div className="reports">
          <div>Reports: {selectedLocation.reports}</div>
          <button onClick={resetReports}>Reset Reports</button>
        </div>
      }
    </div>
  )
}

export default ModeSelect;