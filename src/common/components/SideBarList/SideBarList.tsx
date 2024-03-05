import { useAppSelector } from "../../../Redux/hooks";
import LocationDetails from "../LocationDetails/LocationDetails";
import { AsideWrapper } from "../SectionWrapper.styled";

interface SidbarProps {
  open?: boolean
}
const SidebarList: React.FC<SidbarProps> = ({ open }) => {
  const locations = useAppSelector((state) => state.locations.locations)
  const locationId = useAppSelector((state) => state.locations.focusedLocation.id)

  return (
    <AsideWrapper>
      {locations.map((item) => (
        <LocationDetails selected={locationId === item.id} key={item.id} {...item} />
      ))}
    </AsideWrapper>
  )
}

export default SidebarList;