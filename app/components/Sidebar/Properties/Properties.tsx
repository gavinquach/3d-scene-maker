import { JSX } from "react";
import { Object3D } from "three";
import useStore from "@/app/utils/store.js";
import { PropertiesTableContainer } from "./PropertiesStyled.ts";
import { SidebarHeaderText } from "../SidebarStyled";
import CommonProperties from "./SubProperties/CommonProperties.tsx";
import SceneProperties from "./SubProperties/SceneProperties.tsx";
import ObjectProperties from "./SubProperties/ObjectProperties.tsx";

export default function Properties(): JSX.Element {
    const selectedObject = useStore((state) => state.selectedObject);
    const { objRef } = selectedObject;
    console.log(objRef);

    return (
        <>
            <SidebarHeaderText>Object Properties</SidebarHeaderText>
            <PropertiesTableContainer>
                <CommonProperties />

                {(selectedObject.objRef as Object3D)?.type === "Scene" ? (
                    <SceneProperties />
                ) : (
                    <ObjectProperties />
                )}
            </PropertiesTableContainer>
        </>
    );
}
