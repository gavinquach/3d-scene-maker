import React, { startTransition } from "react";
import { ENVMAP_PATH } from "@/app/utils/constants.ts";
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
                selected={environment === env[0]}
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
};
