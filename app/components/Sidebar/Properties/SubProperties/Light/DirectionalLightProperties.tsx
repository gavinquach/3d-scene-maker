import React, { startTransition, useState } from "react";
import { DirectionalLight, Object3D } from "three";
import type { InputWithDragChangeHandler } from "react-input-with-drag";
import {
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    InputWithDragStyled,
} from "../../PropertiesStyled.ts";
import useStore from "@/app/utils/store.js";

export const DirectionalLightProperties: React.FC<{
    name: string;
    object: Object3D;
}> = ({ name, object }) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setObjectProperty = useStore((state) => state.setObjectProperty);

    const lightProperties = sceneCollection[name].properties;
    const lightHelper = sceneCollection[name].helper;

    const [x, setX] = useState<number>(lightProperties.target.x);
    const [y, setY] = useState<number>(lightProperties.target.y);
    const [z, setZ] = useState<number>(lightProperties.target.z);

    const handleSetX: InputWithDragChangeHandler = (value) => {
        if (isNaN(value)) return;

        if (object instanceof DirectionalLight) {
            object.target.position.x = value;
            setX(value);

            lightHelper?.update();
            const target = {
                x: value,
                y: object.target.position.y,
                z: object.target.position.z,
            };
            startTransition(() => {
                setObjectProperty(name, "target", target);
            });
        }
    };
    const handleSetY: InputWithDragChangeHandler = (value) => {
        if (isNaN(value)) return;

        if (object instanceof DirectionalLight) {
            object.target.position.y = value;
            setY(value);

            lightHelper?.update();
            const target = {
                x: object.target.position.x,
                y: value,
                z: object.target.position.z,
            };
            startTransition(() => {
                setObjectProperty(name, "target", target);
            });
        }
    };
    const handleSetZ: InputWithDragChangeHandler = (value) => {
        if (isNaN(value)) return;

        if (object instanceof DirectionalLight) {
            object.target.position.z = value;
            setZ(value);

            lightHelper?.update();
            const target = {
                x: object.target.position.x,
                y: object.target.position.y,
                z: value,
            };
            startTransition(() => {
                setObjectProperty(name, "target", target);
            });
        }
    };

    return (
        <>
            <PropertiesTableLeftColumn>Target</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <InputWithDragStyled
                    step={0.01}
                    value={x}
                    onChange={handleSetX}
                    onInput={handleSetX}
                />
                <InputWithDragStyled
                    step={0.01}
                    value={y}
                    onChange={handleSetY}
                    onInput={handleSetY}
                />
                <InputWithDragStyled
                    step={0.01}
                    value={z}
                    onChange={handleSetZ}
                    onInput={handleSetZ}
                />
            </PropertiesTableRightColumn>
        </>
    );
};
