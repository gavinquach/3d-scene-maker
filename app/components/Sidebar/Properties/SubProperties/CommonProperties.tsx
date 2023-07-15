import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";
import useStore from "@/app/utils/store";
import { Object3D } from "three";

export const CommonProperties: React.FC = () => {
    const selectedObject = useStore((state) => state.selectedObject);

    return (
        <>
            <PropertiesTableLeftColumn>Name</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                {selectedObject.name}
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Type</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                {(selectedObject.objRef as Object3D)?.type}
            </PropertiesTableRightColumn>
        </>
    );
}
