import React from "react";
import useStore from "@/app/utils/store.js";
import {
    PropertiesInput,
    PropertiesOption,
    PropertiesSelect,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";
import PositionProperties from "./TransformProperties/PositionProperties.tsx";
import RotationProperties from "./TransformProperties/RotationProperties.tsx";
import ScaleProperties from "./TransformProperties/ScaleProperties.tsx";

export default function SceneProperties(): React.JSX.Element {
    const environment = useStore((state) => state.environment);
    const setEnvironment = useStore((state) => state.setEnvironment);
    const environmentBackground = useStore(
        (state) => state.environmentBackground
    );
    const toggleEnvironmentBackground = useStore(
        (state) => state.toggleEnvironmentBackground
    );

    const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEnvironment(e.target.value);
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
            <PropertiesTableLeftColumn>Environment</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesSelect onChange={handleEnvironmentChange}>
                    {dreiBackgroundOptionComponents}
                </PropertiesSelect>
            </PropertiesTableRightColumn>

            <PositionProperties />
            <RotationProperties />
            <ScaleProperties />

            <PropertiesTableLeftColumn>
                Environment Background
            </PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesInput
                    type="checkbox"
                    checked={environmentBackground === true}
                    onChange={toggleEnvironmentBackground}
                />
            </PropertiesTableRightColumn>
        </>
    );
}
