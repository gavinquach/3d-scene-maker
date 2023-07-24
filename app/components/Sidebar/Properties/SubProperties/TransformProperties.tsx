import { FC, startTransition, useState } from "react";
import { Object3D, Scene } from "three";
import type { InputWithDragChangeHandler } from "react-input-with-drag";

import {
    InputWithDragStyled,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";

import useStore from "@/app/utils/store.js";

export const TransformProperty: FC<{
    mode: string;
    name: string;
    object: Object3D;
}> = ({ mode = "position", name, object }) => {
    const scene = useStore((state) => state.scene);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const updateObjectTransform = useStore((state) => state.updateObjectTransform);
    const updateSceneTransform = useStore((state) => state.updateSceneTransform);

    const transforms = (object as Scene).isScene ? scene.transforms : sceneCollection[name]?.transforms;

    const [x, setX] = useState<number>(transforms[mode].x);
    const [y, setY] = useState<number>(transforms[mode].y);
    const [z, setZ] = useState<number>(transforms[mode].z);

    const handleSetX: InputWithDragChangeHandler = (value) => {
        if (isNaN(value)) return;

        (object as any)[mode].x = value;
        setX(value);

        const updatedTransform = {
            x: value,
            y: (object as any)[mode].y,
            z: (object as any)[mode].z,
        };
        startTransition(() => {
            if (name) updateSceneTransform(mode, updatedTransform);
            else updateObjectTransform(name, mode, updatedTransform);
        });
    };
    const handleSetY: InputWithDragChangeHandler = (value) => {
        if (isNaN(value)) return;

        (object as any)[mode].y = value;
        setY(value);

        const updatedTransform = {
            x: (object as any)[mode].x,
            y: value,
            z: (object as any)[mode].z,
        };
        startTransition(() => {
            if (name) updateSceneTransform(mode, updatedTransform);
            else updateObjectTransform(name, mode, updatedTransform);
        });
    };
    const handleSetZ: InputWithDragChangeHandler = (value) => {
        if (isNaN(value)) return;

        (object as any)[mode].z = value;
        setZ(value);

        const updatedTransform = {
            x: (object as any)[mode].x,
            y: (object as any)[mode].y,
            z: value,
        };
        startTransition(() => {
            if (name) updateSceneTransform(mode, updatedTransform);
            else updateObjectTransform(name, mode, updatedTransform);
        });
    };

    return (
        <>
            <PropertiesTableLeftColumn>{mode.charAt(0).toUpperCase() + mode.slice(1)}</PropertiesTableLeftColumn>
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
