import { FC } from "react";
import { SidebarWrapper } from "./SidebarStyled.ts";
import { DirectoryTree } from "./DirectoryTree.tsx";
import { BottomHalf } from "./BottomHalf/BottomHalf.tsx";

export const Sidebar: FC = () => (
    <SidebarWrapper>
        <DirectoryTree />
        <BottomHalf />
    </SidebarWrapper>
);
