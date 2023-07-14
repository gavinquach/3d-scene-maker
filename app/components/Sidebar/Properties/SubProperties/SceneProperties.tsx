import dynamic from "next/dynamic";
import React, { startTransition, useEffect } from "react";
import useStore from "@/app/utils/store.js";
import {
    PropertiesCheckBoxInput,
    PropertiesNumericBox,
    PropertiesOption,
    PropertiesRangeInput,
    PropertiesRangeInputContainer,
    PropertiesSelect,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";
import globalObject from "@/app/utils/globalObject.ts";

const PositionProperties = dynamic(() => import("./TransformProperties.tsx").then((mod) => mod.PositionProperties));
const RotationProperties = dynamic(() => import("./TransformProperties.tsx").then((mod) => mod.RotationProperties));
const ScaleProperties = dynamic(() => import("./TransformProperties.tsx").then((mod) => mod.ScaleProperties));

export const SceneProperties: React.FC = () => {
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
        startTransition(() => {
            setEnvironment(e.target.value);
        });
    };

    const handleEnvIntensityDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setEnvironmentIntensity(e.target.value);
        });
    };

    const handleEnvIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            startTransition(() => {
                setEnvironmentIntensity(parseFloat(e.target.value));
            });
        }
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

    const dreiBackgroundOptionComponents: React.ReactNode[] =
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

    useEffect(() => {
        console.log(globalObject.scene);
    }, []);

    return (
        <>
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
                <PropertiesRangeInputContainer>
                    {/* TODO: FIX NOT DRAGGABLE */}
                    <PropertiesRangeInput
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={environmentIntensity}
                        onChange={handleEnvIntensityDrag}
                    />
                    <PropertiesNumericBox
                        type="numeric"
                        value={environmentIntensity}
                        onChange={handleEnvIntensityChange}
                    />
                </PropertiesRangeInputContainer>
            </PropertiesTableRightColumn>
        </>
    );
}
