import dynamic from "next/dynamic";
import React, { startTransition, useState } from "react";
import {
    Color,
    DirectionalLight,
    PointLight,
    SpotLight,
    Object3D,
} from "three";
import {
    PropertiesCheckBoxInput,
    PropertiesInputLabel,
    PropertiesNumericInput,
    PropertiesRangeInput,
    PropertiesRangeInputContainer,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../../PropertiesStyled.ts";
import useStore from "@/app/utils/store.js";

const PositionProperties = dynamic(() =>
    import("../TransformProperties.tsx").then((mod) => mod.PositionProperties)
);

export const CommonLightProperties: React.FC<{
    name: string;
    object: Object3D;
}> = ({ name, object }) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setObjectProperty = useStore((state) => state.setObjectProperty);

    const lightProperties = sceneCollection[name].properties;

    const [shadow, setShadow] = useState<boolean>(lightProperties.castShadow);
    const [color, setColor] = useState<string>(lightProperties.color);
    const [intensity, setIntensity] = useState<number>(lightProperties.intensity);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            object instanceof DirectionalLight ||
            object instanceof PointLight ||
            object instanceof SpotLight
        ) {
            object.color = new Color(e.target.value);
            startTransition(() => {
                setColor(e.target.value);
                setObjectProperty(name, "color", e.target.value);
            });
        }
    };

    const handleIntensityDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            object instanceof DirectionalLight ||
            object instanceof PointLight ||
            object instanceof SpotLight
        ) {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
                object.intensity = value;
                startTransition(() => {
                    setIntensity(value);
                    setObjectProperty(name, "intensity", value);
                });
            }
        }
    };

    const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (
                object instanceof DirectionalLight ||
                object instanceof PointLight ||
                object instanceof SpotLight
            ) {
                object.intensity = value;
            }
            setIntensity(value);
            startTransition(() => {
                setObjectProperty(name, "intensity", value);
            });
        }
    };

    const handleShadowChange = () => {
        if (
            object instanceof DirectionalLight ||
            object instanceof PointLight ||
            object instanceof SpotLight
        ) {
            const value = !object.castShadow;
            object.castShadow = !object.castShadow;
            setShadow(value);
            startTransition(() => {
                setObjectProperty(name, "castShadow", value);
            });
        }
    };

    return (
        <>
            <PositionProperties />

            <PropertiesTableLeftColumn>Color</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <input type="color" value={color} onChange={handleColorChange} />
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Intensity</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesRangeInputContainer>
                    {/* TODO: FIX NOT DRAGGABLE */}
                    <PropertiesRangeInput
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={intensity}
                        onChange={handleIntensityDrag}
                    />
                    <PropertiesNumericInput
                        type="numeric"
                        value={intensity}
                        onChange={handleIntensityChange}
                    />
                </PropertiesRangeInputContainer>
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Shadow</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <PropertiesCheckBoxInput
                        type="checkbox"
                        checked={shadow}
                        onChange={handleShadowChange}
                    />
                    <PropertiesInputLabel onClick={handleShadowChange}>
                        Cast
                    </PropertiesInputLabel>
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>
        </>
    );
};
