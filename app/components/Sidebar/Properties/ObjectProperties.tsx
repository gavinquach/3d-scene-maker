import useStore from "../../../utils/store.js";
import { memo } from "react";

const ObjectProperties = () => {
    const selectedObject = useStore((state) => state.selectedObject);
    const { objRef } = selectedObject;
    console.log(objRef);

    return (
        <div>
            <h1>Object Properties</h1>
        </div>
    );
};

export default memo(ObjectProperties);
