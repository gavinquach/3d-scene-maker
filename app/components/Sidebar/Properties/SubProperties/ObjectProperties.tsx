import dynamic from "next/dynamic";
import { FC } from "react";

const PositionProperties = dynamic(() => import("./TransformProperties.tsx").then((mod) => mod.PositionProperties));
const RotationProperties = dynamic(() => import("./TransformProperties.tsx").then((mod) => mod.RotationProperties));
const ScaleProperties = dynamic(() => import("./TransformProperties.tsx").then((mod) => mod.ScaleProperties));

export const ObjectProperties: FC = () => {
    return (
        <>
            <PositionProperties />
            <RotationProperties />
            <ScaleProperties />
        </>
    );
};
