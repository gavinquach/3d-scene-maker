import React, { startTransition, useState } from "react";
import { ENVMAP_LIST, ENVMAP_PATH } from "@/app/utils/constants.ts";
import {
    PropertiesCheckBoxInput,
    PropertiesNumericInput,
    PropertiesOption,
    PropertiesRangeInput,
    PropertiesRangeInputContainer,
    PropertiesSelect,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";
import useStore from "@/app/utils/store.js";

export const SceneProperties: React.FC = () => {
    const scene = useStore((state) => state.scene);
    const setSceneProperties = useStore((state) => state.setSceneProperties);

    const [environment, setEnvironment] = useState<string>(scene.properties.environment);
    const [envIntensity, setEnvIntensity] = useState<number>(scene.properties.environmentIntensity);
    const [envBackground, setEnvBackground] = useState<boolean>(scene.properties.environmentBackground);

    const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEnvironment(e.target.value);
        startTransition(() => {
            setSceneProperties("environment", e.target.value);
        });
    };

    const toggleEnvironmentBackground = () => {
        const value = !envBackground;
        setEnvBackground(value);
        startTransition(() => {
            setSceneProperties("environmentBackground", value);
        });
    };

    const handleEnvIntensityDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        startTransition(() => {
            setEnvIntensity(value);
            setSceneProperties("environmentIntensity", value);
        });
    };

    const handleEnvIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            startTransition(() => {
                setEnvIntensity(value);
                setSceneProperties("environmentIntensity", value);
            });
        }
    };

    const dreiBackgroundOptionComponents: React.ReactNode[] =
        Object.entries(ENVMAP_LIST).map((env) => (
            <PropertiesOption
                value={env[1]}
                key={env[0]}
            >
                {env[0]}
            </PropertiesOption>
        ));

    return (
        <>
            <PropertiesTableLeftColumn>Environment</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesSelect defaultValue={environment} onChange={handleEnvironmentChange}>
                    {dreiBackgroundOptionComponents}
                </PropertiesSelect>
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>
                Environment Background
            </PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={envBackground}
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
                        value={envIntensity}
                        onChange={handleEnvIntensityDrag}
                    />
                    <PropertiesNumericInput
                        type="numeric"
                        value={envIntensity}
                        onChange={handleEnvIntensityChange}
                    />
                </PropertiesRangeInputContainer>
            </PropertiesTableRightColumn>
        </>
    );
};
