import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";
import { Object3D } from "three";

export const CommonProperties: React.FC<{ name: string; object: Object3D }> = ({
    name,
    object,
}) => {
    return (
        <>
            <PropertiesTableLeftColumn>Name</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>{name}</PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Type</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>{object?.type}</PropertiesTableRightColumn>
        </>
    );
};
