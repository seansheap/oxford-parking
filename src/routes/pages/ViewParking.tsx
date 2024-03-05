import { useViewport } from "../../Redux/hooks";
import SimpleMap from "../../common/components/MapGoogle/MapGoogle";
import { MainWrapperH, MainWrapperV, SectionWrapper } from "../../common/components/SectionWrapper.styled";
import SidebarList from "../../common/components/SideBarList/SideBarList";

const ViewParking = () => {
  const { minWidth } = useViewport();
  const mobile = minWidth({ size: 'md' })
  return (
    <>
      <SectionWrapper>

        {!mobile ? (
          <MainWrapperH>
            <SidebarList />
            <SimpleMap />
          </MainWrapperH>
        ) : (
          <MainWrapperV>
            <SimpleMap />
            <SidebarList />
          </MainWrapperV>
        )}

      </SectionWrapper>
    </>
  )
};

export default ViewParking;