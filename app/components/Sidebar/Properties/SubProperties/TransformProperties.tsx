import { FC } from "react";
import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../PropertiesStyled.ts";
import DragInput from "../DragInput.tsx";

export const PositionProperties: FC = () => {
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

export const RotationProperties: FC = () => {
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

export const ScaleProperties: FC = () => {
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
