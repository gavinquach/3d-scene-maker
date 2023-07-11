import React from "react";
import useStore from "../../../utils/store.js";
import PropertiesCommon from "./PropertiesCommon.tsx";
import { PropertiesHeaderText } from "./PropertiesStyled.ts";

export default function ObjectProperties(): React.JSX.Element {
    const selectedObject = useStore((state) => state.selectedObject);
    const { objRef } = selectedObject;
    console.log(objRef);

    return (
        <div>
            <PropertiesHeaderText>Object Properties</PropertiesHeaderText>
            <PropertiesCommon />
        </div>
    );
};
