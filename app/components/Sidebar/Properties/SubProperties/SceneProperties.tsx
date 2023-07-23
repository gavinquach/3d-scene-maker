import React, { startTransition, useState } from "react";
import { ENVMAP_PATH } from "@/app/utils/constants.ts";
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
        console.log(e.target.value);
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

    const dreiBackgroundList = {
        "none": "",
        "apartment": `${ENVMAP_PATH}/lebombo_1k.hdr`,
        "city": `${ENVMAP_PATH}/potsdamer_platz_1k.hdr`,
        "dawn": `${ENVMAP_PATH}/kiara_1_dawn_1k.hdr`,
        "forest": `${ENVMAP_PATH}/forest_slope_1k.hdr`,
        "lobby": `${ENVMAP_PATH}/st_fagans_interior_1k.hdr`,
        "night": `${ENVMAP_PATH}/dikhololo_night_1k.hdr`,
        "park": `${ENVMAP_PATH}/rooitou_park_1k.hdr`,
        "studio": `${ENVMAP_PATH}/studio_small_03_1k.hdr`,
        "sunset": `${ENVMAP_PATH}/venice_sunset_1k.hdr`,
        "warehouse": `${ENVMAP_PATH}/empty_warehouse_01_1k.hdr`,
    };

    const dreiBackgroundOptionComponents: React.ReactNode[] =
        Object.entries(dreiBackgroundList).map((env) => (
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
