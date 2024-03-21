import { useRef } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import LocationDetails from "../LocationDetails/LocationDetails";
import { AsideWrapper } from "../SectionWrapper.styled";

interface SidbarProps {
  open?: boolean
}
const SidebarList: React.FC<SidbarProps> = ({ open }) => {
  const locations = useAppSelector((state) => state.locations.locations)
  const focusedLocation = useAppSelector((state) => state.locations.focusedLocation)
  const ref = useRef<HTMLDivElement>(null)
  const scrollToTop = () => {
    const aside = ref.current;
    aside?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <AsideWrapper ref={ref} >
      {focusedLocation.id && <LocationDetails scrollToTop={scrollToTop} selected={true} locationData={focusedLocation} />}
      {locations.map((item) => (
        item.id !== focusedLocation?.id &&
        <LocationDetails scrollToTop={scrollToTop} selected={false} key={item.id} locationData={item} />
      ))}
    </AsideWrapper>
  )
}

export default SidebarList;