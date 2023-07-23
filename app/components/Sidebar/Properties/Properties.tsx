import dynamic from "next/dynamic";
import { FC } from "react";
import { Object3D, Scene } from "three";

import useStore from "@/app/utils/store.js";
import { BottomHalfHeaderText } from "../BottomHalf/BottomHalfStyled.ts";
import { PropertiesTableContainer } from "./PropertiesStyled.ts";
import { LIGHT_TYPES } from "@/app/utils/constants.ts";
import { CommonProperties } from "./SubProperties/CommonProperties.tsx";
import { MeshProperties } from "./SubProperties/Mesh/MeshProperties.tsx";
import { Object3DProperties } from "./SubProperties/Object3DProperties.tsx";
import { SceneProperties } from "./SubProperties/SceneProperties.tsx";

const CommonLightProperties = dynamic(() =>
    import("./SubProperties/Light/CommonLightProperties.tsx").then(
        (mod) => mod.CommonLightProperties
    ), { ssr: false }
);
const LightProperties = dynamic(() =>
    import("./SubProperties/Light/LightProperties.tsx").then(
        (mod) => mod.LightProperties
    ), { ssr: false }
);

export const Properties: FC<{ objectCategory: number }> = ({
    objectCategory,
}) => {
    const selectedObject = useStore((state) => state.selectedObject);

    return (
        <>
            {objectCategory === 0 && (
                <>
                    <BottomHalfHeaderText>Properties</BottomHalfHeaderText>
                    <PropertiesTableContainer>
                        <CommonProperties name={selectedObject.name} object={selectedObject.objRef} />

                        {(selectedObject.objRef as Scene)?.isScene && (
                            <SceneProperties />
                        )}

                        {(selectedObject.objRef as Object3D)?.isObject3D &&
                            (!LIGHT_TYPES.includes(
                                (selectedObject.objRef as Object3D)?.type
                            ) ? (
                                <>
                                    <MeshProperties name={selectedObject.name} object={selectedObject.objRef} />
                                    <Object3DProperties name={selectedObject.name} object={selectedObject.objRef} />
                                </>
                            ) : (
                                <>
                                    <CommonLightProperties name={selectedObject.name} object={selectedObject.objRef} />
                                    <LightProperties />
                                    <Object3DProperties name={selectedObject.name} object={selectedObject.objRef} />
                                </>
                            ))}
                    </PropertiesTableContainer>
                </>
            )}
            {objectCategory === 1 && (
                <>
                    <BottomHalfHeaderText>Geometry</BottomHalfHeaderText>
                    <PropertiesTableContainer></PropertiesTableContainer>
                </>
            )}
            {objectCategory === 2 && (
                <>
                    <BottomHalfHeaderText>Material</BottomHalfHeaderText>
                    <PropertiesTableContainer></PropertiesTableContainer>
                </>
            )}
        </>
    );
};
