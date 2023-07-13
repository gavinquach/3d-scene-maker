import { SidebarWrapper } from "./SidebarStyled.ts";
import DirectoryTree from "./DirectoryTree.tsx";
import BottomHalf from "./BottomHalf/BottomHalf.tsx";

const Sidebar = () => (
    <SidebarWrapper>
        <DirectoryTree />
        <BottomHalf />
    </SidebarWrapper>
);

export default Sidebar;
