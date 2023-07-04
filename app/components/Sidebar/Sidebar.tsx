import { styled } from "styled-components";
import DirectoryTree from "./DirectoryTree.tsx";
import BottomHalf from "./BottomHalf/BottomHalf.tsx";

const SidebarWrapper = styled.div`
    height: 100%;
    width: 25%;
    overflow: hidden;
    background-color: #1f2937;
`;

const Sidebar = () => (
    <SidebarWrapper>
        <DirectoryTree />
        <BottomHalf />
    </SidebarWrapper>
);

export default Sidebar;
