import { FC } from "react";
import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../PropertiesStyled.ts";
import { TransformDragInput } from "../TransformDragInput.tsx";

export const PositionProperties: FC = () => {
    return (
        <>
            <PropertiesTableLeftColumn>Position</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <TransformDragInput transformMode="position" axis="x" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <TransformDragInput transformMode="position" axis="y" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <TransformDragInput transformMode="position" axis="z" />
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
                    <TransformDragInput transformMode="rotation" axis="x" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <TransformDragInput transformMode="rotation" axis="y" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <TransformDragInput transformMode="rotation" axis="z" />
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
                    <TransformDragInput transformMode="scale" axis="x" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <TransformDragInput transformMode="scale" axis="y" />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <TransformDragInput transformMode="scale" axis="z" />
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>
        </>
    );
};
