import React, { startTransition, useState } from "react";
import { Object3D, PointLight } from "three";
import {
    PropertiesNumericInput,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../../PropertiesStyled.ts";
import useStore from "@/app/utils/store.js";

export const PointLightProperties: React.FC<{
    name: string;
    object: Object3D;
}> = ({ name, object }) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setObjectProperty = useStore((state) => state.setObjectProperty);

    const lightProperties = sceneCollection[name].properties;
    const lightHelper = sceneCollection[name].helper;

    const [decay, setDecay] = useState<number>(lightProperties.decay);
    const [distance, setDistance] = useState<number>(lightProperties.distance);

    const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (object instanceof PointLight) {
                setDistance(value);
                startTransition(() => {
                    setObjectProperty(name, "distance", value);
                });
                object.distance = value;
                lightHelper?.update();
            }
        }
    };

    const handleDecayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (object instanceof PointLight) {
                setDecay(value);
                startTransition(() => {
                    setObjectProperty(name, "decay", value);
                });
                object.decay = value;
                lightHelper?.update();
            }
        }
    };

    return (
        <>
            <PropertiesTableLeftColumn>Decay</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericInput
                    type="number"
                    min={0}
                    defaultValue={decay}
                    onChange={handleDecayChange}
                />
            </PropertiesTableRightColumn>
            <PropertiesTableLeftColumn>Distance</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericInput
                    type="number"
                    min={0}
                    defaultValue={distance}
                    onChange={handleDistanceChange}
                />
            </PropertiesTableRightColumn>
        </>
    );
};
