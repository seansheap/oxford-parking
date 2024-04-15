import { useViewport } from "../../Redux/hooks";
import GoogleMap from "../../common/components/MapGoogle/MapGoogle";
import { MainWrapperH, MainWrapperV, SectionWrapper } from "../../common/components/SectionWrapper.styled";
import SidebarList from "../../common/components/SideBarList/SideBarList";

const ViewParking = () => {
  const { minWidth } = useViewport();
  const mobile = minWidth({ size: 'lg' })
  return (
    <>
      <SectionWrapper>

        {!mobile ? (
          <MainWrapperH>
            <SidebarList />
            <GoogleMap />
          </MainWrapperH>

        ) : (
          <MainWrapperV>
            <GoogleMap />
            <SidebarList />
          </MainWrapperV>
        )}

      </SectionWrapper>
    </>
  )
};

export default ViewParking;