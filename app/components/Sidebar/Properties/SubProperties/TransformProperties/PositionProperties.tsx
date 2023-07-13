import { JSX } from "react";
import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../../PropertiesStyled.ts";
import DragInput from "../../DragInput.tsx";

export default function PositionProperties(): JSX.Element {
    return (
        <>
            <PropertiesTableLeftColumn>Position</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="position" axis="x" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="position" axis="y" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="position" axis="z" />
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>
        </>
    );
};
