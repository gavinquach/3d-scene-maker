import { FC } from "react";
import { SidebarWrapper } from "./SidebarStyled.ts";
import { UpperHalf } from "./UpperHalf/UpperHalf.tsx";
import { BottomHalf } from "./BottomHalf/BottomHalf.tsx";

export const Sidebar: FC = () => (
    <SidebarWrapper>
        <UpperHalf />
        <BottomHalf />
    </SidebarWrapper>
);
