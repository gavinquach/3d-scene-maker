import React, { MouseEventHandler, startTransition, useState } from "react";
import { Object3D, SpotLight } from "three";
import type { InputWithDragChangeHandler } from "react-input-with-drag";
import {
    PropertiesNumericInput,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    InputWithDragStyled,
} from "../../PropertiesStyled.ts";
import useStore from "@/app/utils/store.js";

export const SpotLightProperties: React.FC<{
    name: string;
    object: Object3D;
}> = ({ name, object }) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const updateObjectProperty = useStore((state) => state.updateObjectProperty);

    const lightProperties = sceneCollection[name].properties;
    const lightHelper = sceneCollection[name].helper;

    const [angle, setAngle] = useState<number>(lightProperties.angle);
    const [distance, setDistance] = useState<number>(lightProperties.distance);
    const [decay, setDecay] = useState<number>(lightProperties.decay);
    const [penumbra, setPenumbra] = useState<number>(lightProperties.penumbra);

    const [x, setX] = useState<number>(lightProperties.target.x);
    const [y, setY] = useState<number>(lightProperties.target.y);
    const [z, setZ] = useState<number>(lightProperties.target.z);

    const handleSetX: InputWithDragChangeHandler = (value) => {
        // fired on every input change, including every pixel dragged
        if (isNaN(value)) return;

        if (object instanceof SpotLight) {
            object.target.position.x = value;
            lightHelper?.update();

            setX(value);

            const target = {
                x: value,
                y: object.target.position.y,
                z: object.target.position.z,
            };
            startTransition(() => {
                updateObjectProperty(name, "target", target);
            });
        }
    };
    const handleSetY: InputWithDragChangeHandler = (value) => {
        // fired on every input change, including every pixel dragged
        if (isNaN(value)) return;

        if (object instanceof SpotLight) {
            object.target.position.y = value;
            lightHelper?.update();

            setY(value);

            const target = {
                x: object.target.position.x,
                y: value,
                z: object.target.position.z,
            };
            startTransition(() => {
                updateObjectProperty(name, "target", target);
            });
        }
    };
    const handleSetZ: InputWithDragChangeHandler = (value) => {
        // fired on every input change, including every pixel dragged
        if (isNaN(value)) return;

        if (object instanceof SpotLight) {
            object.target.position.z = value;
            lightHelper?.update();

            setZ(value);

            const target = {
                x: object.target.position.x,
                y: object.target.position.y,
                z: value,
            };
            startTransition(() => {
                updateObjectProperty(name, "target", target);
            });
        }
    };

    const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (object instanceof SpotLight) {
                setAngle(value);
                startTransition(() => {
                    updateObjectProperty(name, "angle", value);
                });
                object.angle = value;
                lightHelper?.update();
            }
        }
    };

    const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (object instanceof SpotLight) {
                setDistance(value);
                startTransition(() => {
                    updateObjectProperty(name, "distance", value);
                });
                object.distance = value;
                lightHelper?.update();
            }
        }
    };

    const handleDecayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (object instanceof SpotLight) {
                setDecay(value);
                startTransition(() => {
                    updateObjectProperty(name, "decay", value);
                });
                object.decay = value;
                lightHelper?.update();
            }
        }
    };

    const handlePenumbraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (object instanceof SpotLight) {
                setPenumbra(value);
                startTransition(() => {
                    updateObjectProperty(name, "penumbra", value);
                });
                object.penumbra = value;
                lightHelper?.update();
            }
        }
    };

    return (
        <>
            <PropertiesTableLeftColumn>Angle</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericInput
                    type="number"
                    min={0}
                    step={0.01}
                    defaultValue={angle}
                    onChange={handleAngleChange}
                />
            </PropertiesTableRightColumn>
            <PropertiesTableLeftColumn>Decay</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericInput
                    type="number"
                    min={0}
                    step={0.01}
                    defaultValue={decay}
                    onChange={handleDecayChange}
                />
            </PropertiesTableRightColumn>
            <PropertiesTableLeftColumn>Distance</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericInput
                    type="number"
                    min={0}
                    step={0.01}
                    defaultValue={distance}
                    onChange={handleDistanceChange}
                />
            </PropertiesTableRightColumn>
            <PropertiesTableLeftColumn>Penumbra</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericInput
                    type="number"
                    min={0}
                    step={0.01}
                    defaultValue={penumbra}
                    onChange={handlePenumbraChange}
                />
            </PropertiesTableRightColumn>

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
