import useStore from "../../../utils/store.js";
import { memo } from "react";
import PropertiesCommon from "./PropertiesCommon.tsx";

const ObjectProperties = () => {
    const selectedObject = useStore((state) => state.selectedObject);
    const { objRef } = selectedObject;
    console.log(objRef);

    return (
        <div>
            <h1>Object Properties</h1>
            <PropertiesCommon />
        </div>
    );
};

export default memo(ObjectProperties);
