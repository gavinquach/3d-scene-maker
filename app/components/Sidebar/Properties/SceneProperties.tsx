import useStore from "../../../utils/store.js";
import { memo } from "react";
import PropertiesCommon from "./PropertiesCommon.tsx";
import { PropertiesHeaderText } from "./PropertiesStyled.tsx";

const SceneProperties = () => {
    const selectedObject = useStore((state) => state.selectedObject);
    const { objRef } = selectedObject;
    console.log(objRef);

    return (
        <div>
            <PropertiesHeaderText>Scene Properties</PropertiesHeaderText>
            <PropertiesCommon isScene />
        </div>
    );
};

export default memo(SceneProperties);
