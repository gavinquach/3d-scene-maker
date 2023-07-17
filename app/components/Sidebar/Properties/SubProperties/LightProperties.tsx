import dynamic from "next/dynamic";
import React, { startTransition, useState } from "react";
import { Color, DirectionalLight, Object3D, PointLight, SpotLight } from "three";
import {
    PropertiesCheckBoxInput,
    PropertiesInputLabel,
    PropertiesNumericBox,
    PropertiesRangeInput,
    PropertiesRangeInputContainer,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../PropertiesStyled.ts";
import useStore from "@/app/utils/store.js";

const PositionProperties = dynamic(() =>
    import("./TransformProperties.tsx").then((mod) => mod.PositionProperties)
);

export const LightProperties: React.FC<{ name: string, object: Object3D }> = ({ name, object }) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setObjectProperty = useStore((state) => state.setObjectProperty);

    const lightProperties = sceneCollection[name].properties;

    const [value, setValue] = useState<boolean>(false);
    const [color, setColor] = useState<string>(lightProperties.color);
    const [intensity, setIntensity] = useState<number>(lightProperties.intensity);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (object instanceof DirectionalLight || object instanceof SpotLight || object instanceof PointLight) {
            object.color = new Color(e.target.value);
        }

        startTransition(() => {
            setColor(e.target.value);
            setObjectProperty(name, "color", e.target.value);
        });
    };

    const handleIntensityDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIntensity(parseFloat(e.target.value));
        startTransition(() => {
            setObjectProperty(name, "intensity", parseFloat(e.target.value));
        });
    };

    const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setIntensity(parseFloat(e.target.value));
            startTransition(() => {
                setObjectProperty(name, "intensity", parseFloat(e.target.value));
            });
        }
    };

    return (
        <>
            <PositionProperties />

            <PropertiesTableLeftColumn>Color</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
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
                    <PropertiesNumericBox
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
                        checked={object.castShadow === true}
                        onChange={() => {
                            object.castShadow = !object.castShadow;
                            setValue(!value);
                        }}
                    />
                    <PropertiesInputLabel
                        onClick={() => {
                            object.castShadow = !object.castShadow;
                            setValue(!value);
                        }}
                    >
                        Cast
                    </PropertiesInputLabel>
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Visible</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={object.visible === true}
                    onChange={() => {
                        object.visible = !object.visible;
                        setValue(!value);
                    }}
                />
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Frustum Cull</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={object.frustumCulled === true}
                    onChange={() => {
                        object.frustumCulled = !object.frustumCulled;
                        setValue(!value);
                    }}
                />
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Render Order</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericBox type="number" defaultValue={object.renderOrder} />
            </PropertiesTableRightColumn>
        </>
    );
};
