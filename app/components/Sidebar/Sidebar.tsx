import dynamic from "next/dynamic";
import { FC } from "react";
import { SidebarWrapper } from "./SidebarStyled.ts";

const BottomHalf = dynamic(() => import("./BottomHalf/BottomHalf.tsx").then((mod) => mod.BottomHalf));
const DirectoryTree = dynamic(() => import("./DirectoryTree.tsx").then((mod) => mod.DirectoryTree));

export const Sidebar: FC = () => (
    <SidebarWrapper>
        <DirectoryTree />
        <BottomHalf />
    </SidebarWrapper>
);
