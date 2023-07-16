import dynamic from "next/dynamic";
import { FC } from "react";
import { SidebarWrapper } from "./SidebarStyled.ts";
import { DirectoryTree } from "./DirectoryTree.tsx";
const BottomHalf = dynamic(
    () => import("./BottomHalf/BottomHalf.tsx").then((mod) => mod.BottomHalf),
    { ssr: true }
);

export const Sidebar: FC = () => (
    <SidebarWrapper>
        <DirectoryTree />
        <BottomHalf />
    </SidebarWrapper>
);
