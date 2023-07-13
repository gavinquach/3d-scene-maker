import React from "react";
import useStore from "@/app/utils/store.js";
import {
    PropertiesCheckBoxInput,
    PropertiesNumberBox,
    PropertiesOption,
    PropertiesRangeInput,
    PropertiesSelect,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";
import PositionProperties from "./TransformProperties/PositionProperties.tsx";
import RotationProperties from "./TransformProperties/RotationProperties.tsx";
import ScaleProperties from "./TransformProperties/ScaleProperties.tsx";

export default function SceneProperties(): React.JSX.Element {
    const environment = useStore((state) => state.environment);
    const environmentIntensity = useStore((state) => state.environmentIntensity);
    const setEnvironment = useStore((state) => state.setEnvironment);
    const environmentBackground = useStore(
        (state) => state.environmentBackground
    );
    const toggleEnvironmentBackground = useStore(
        (state) => state.toggleEnvironmentBackground
    );
    const setEnvironmentIntensity = useStore(
        (state) => state.setEnvironmentIntensity
    );

    const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEnvironment(e.target.value);
    };

    const handleEnvIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnvironmentIntensity(parseFloat(e.target.value));
    };

    const dreiBackgroundList: string[] = [
        "",
        "apartment",
        "city",
        "dawn",
        "forest",
        "lobby",
        "night",
        "park",
        "studio",
        "sunset",
        "warehouse",
    ];

    const dreiBackgroundOptionComponents: React.JSX.Element[] =
        dreiBackgroundList.map((option) => (
            <>
                {option === "" ? (
                    <PropertiesOption
                        selected={environment === null}
                        value={option}
                        key={option}
                    >
                        none
                    </PropertiesOption>
                ) : (
                    <PropertiesOption
                        selected={environment === option}
                        value={option}
                        key={option}
                    >
                        {option}
                    </PropertiesOption>
                )}
            </>
        ));

    return (
        <>
            <PositionProperties />
            <RotationProperties />
            <ScaleProperties />

            <PropertiesTableLeftColumn>Environment</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesSelect onChange={handleEnvironmentChange}>
                    {dreiBackgroundOptionComponents}
                </PropertiesSelect>
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>
                Environment Background
            </PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={environmentBackground === true}
                    onChange={toggleEnvironmentBackground}
                />
            </PropertiesTableRightColumn>
            <PropertiesTableLeftColumn>
                Environment Intensity
            </PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>

                {/* TODO: FIX NOT DRAGGABLE */}
                <PropertiesRangeInput
                    type="range"
                    min="0"
                    max="1"
                    value="0.5"
                    step={0.01}
                    onChange={handleEnvIntensityChange}
                />
                <PropertiesNumberBox id="envMapIntensityDOM">
                    {environmentIntensity}
                </PropertiesNumberBox>
            </PropertiesTableRightColumn>
        </>
    );
}
