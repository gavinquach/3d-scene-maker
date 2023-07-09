import useStore from "../../../utils/store.js";
import { memo } from "react";
import PropertiesCommon from "./PropertiesCommon.tsx";
import { PropertiesHeaderText } from "./PropertiesStyled.tsx";

const ObjectProperties = () => {
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

export default memo(ObjectProperties);
