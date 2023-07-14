import dynamic from "next/dynamic";
import { FC } from "react";
import { Object3D } from "three";
import useStore from "@/app/utils/store.js";
import { PropertiesTableContainer } from "./PropertiesStyled.ts";
import { SidebarHeaderText } from "../SidebarStyled";

const CommonProperties = dynamic(() =>
    import("./SubProperties/CommonProperties.tsx").then(
        (mod) => mod.CommonProperties
    )
);
const SceneProperties = dynamic(() =>
    import("./SubProperties/SceneProperties.tsx").then(
        (mod) => mod.SceneProperties
    )
);
const ObjectProperties = dynamic(() =>
    import("./SubProperties/ObjectProperties.tsx").then(
        (mod) => mod.ObjectProperties
    )
);

export const Properties: FC = () => {
    const selectedObject = useStore((state) => state.selectedObject);
    const { objRef } = selectedObject;
    console.log(objRef);

    return (
        <>
            <SidebarHeaderText>Object Properties</SidebarHeaderText>
            <PropertiesTableContainer>
                <CommonProperties />

                {(selectedObject.objRef as Object3D)?.type === "Scene" && (
                    <SceneProperties />
                )}

                {(selectedObject.objRef as Object3D)?.isObject3D && (
                    <ObjectProperties />
                )}
            </PropertiesTableContainer>
        </>
    );
};
