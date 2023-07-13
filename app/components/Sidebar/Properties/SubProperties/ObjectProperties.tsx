import { JSX } from "react";
import PositionProperties from "./TransformProperties/PositionProperties.tsx";
import RotationProperties from "./TransformProperties/RotationProperties.tsx";
import ScaleProperties from "./TransformProperties/ScaleProperties.tsx";

export default function ObjectProperties(): JSX.Element {
    return (
        <>
            <PositionProperties />
            <RotationProperties />
            <ScaleProperties />
        </>
    );
};
