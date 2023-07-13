import { JSX } from "react";
import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../../PropertiesStyled.ts";
import DragInput from "../../DragInput.tsx";

export default function RotationProperties(): JSX.Element {
    return (
        <>
            <PropertiesTableLeftColumn>Rotation</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="rotation" axis="x" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="rotation" axis="y" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="rotation" axis="z" />
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>
        </>
    );
};
