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
import { DirectionalLightProperties } from "./SubProperties/Light/DirectionalLightProperties.tsx";
import { SpotLightProperties } from "./SubProperties/Light/SpotLightProperties.tsx";
import { PointLightProperties } from "./SubProperties/Light/PointLightProperties.tsx";

const CommonLightProperties = dynamic(
    () =>
        import("./SubProperties/Light/CommonLightProperties.tsx").then(
            (mod) => mod.CommonLightProperties
        ),
    { ssr: false }
);

export const Properties: FC<{ objectCategory: number }> = ({
    objectCategory,
}) => {
    const selectedObject = useStore((state) => state.selectedObject);

    const { name, object, objRef } = selectedObject;

    return (
        <>
            {objectCategory === 0 && (
                <>
                    <BottomHalfHeaderText>Properties</BottomHalfHeaderText>
                    <PropertiesTableContainer>
                        <CommonProperties name={name} object={objRef} />

                        {(objRef as Scene)?.isScene && <SceneProperties />}

                        {(objRef as Object3D)?.isObject3D &&
                            (!LIGHT_TYPES.includes((objRef as Object3D)?.type) ? (
                                <MeshProperties key={name} name={name} object={objRef} />
                            ) : (
                                <>
                                    <CommonLightProperties
                                        key={name}
                                        name={name}
                                        object={objRef}
                                    />
                                    {object.type === "DirectionalLight" && (
                                        <DirectionalLightProperties name={name} object={objRef} />
                                    )}
                                    {object.type === "SpotLight" && (
                                        <SpotLightProperties name={name} object={objRef} />
                                    )}
                                    {object.type === "PointLight" && (
                                        <PointLightProperties name={name} object={objRef} />
                                    )}
                                </>
                            ))}
                        <Object3DProperties name={name} object={objRef} />
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
