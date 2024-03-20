import { useAppSelector } from "../../../Redux/hooks";
import LocationDetails from "../LocationDetails/LocationDetails";
import { AsideWrapper } from "../SectionWrapper.styled";

interface SidbarProps {
  open?: boolean
}
const SidebarList: React.FC<SidbarProps> = ({ open }) => {
  const locations = useAppSelector((state) => state.locations.locations)
  const focusedLocation = useAppSelector((state) => state.locations.focusedLocation)

  return (
    <AsideWrapper>
      {focusedLocation.id && <LocationDetails selected={true} locationData={focusedLocation} />}
      {locations.map((item) => (
        item.id !== focusedLocation?.id &&
        <LocationDetails selected={false} key={item.id} locationData={item} />
      ))}
    </AsideWrapper>
  )
}

export default SidebarList;