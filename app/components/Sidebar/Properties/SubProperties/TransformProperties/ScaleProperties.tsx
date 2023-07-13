import { JSX } from "react";
import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../../PropertiesStyled.ts";
import DragInput from "../../DragInput.tsx";

export default function ScaleProperties(): JSX.Element {
    return (
        <>
            <PropertiesTableLeftColumn>Scale</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="scale" axis="x" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="scale" axis="y" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <DragInput transformMode="scale" axis="z" />
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>
        </>
    );
};
