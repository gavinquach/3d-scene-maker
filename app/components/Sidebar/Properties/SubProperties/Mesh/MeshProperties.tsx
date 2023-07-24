import { FC, startTransition, useState } from "react";
import { Object3D, Scene } from "three";
import {
    PropertiesCheckBoxInput,
    PropertiesInputLabel,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../../PropertiesStyled.ts";
import { TransformProperty } from "../TransformProperties.tsx";

import useStore from "@/app/utils/store.js";

export const MeshProperties: FC<{ name: string; object: Object3D }> = ({
    name,
    object,
}) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const updateObjectProperty = useStore((state) => state.updateObjectProperty);
    const scene = useStore((state) => state.scene);
    const updateSceneProperties = useStore((state) => state.updateSceneProperties);

    const properties = (object as Scene).isScene ? scene.properties : sceneCollection[name]?.properties;

    const [castShadow, setCastShadow] = useState<boolean>(properties.castShadow);
    const [receiveShadow, setReceiveShadow] = useState<boolean>(
        properties.receiveShadow
    );

    const handleCastShadowToggle = () => {
        const value = !castShadow;
        setCastShadow(value);
        startTransition(() => {
            if (name) {
                updateObjectProperty(name, "castShadow", value);
            } else {
                updateSceneProperties("castShadow", value);
                object.castShadow = value;
            }
        });
    };

    const handleReceiveShadowToggle = () => {
        const value = !receiveShadow;
        setReceiveShadow(value);
        startTransition(() => {
            if (name) {
                updateObjectProperty(name, "receiveShadow", value);
            } else {
                updateSceneProperties("receiveShadow", value);
                object.receiveShadow = value;
            }
        });
    };

    return (
        <>
            <TransformProperty mode="position" name={name} object={object} />
            <TransformProperty mode="rotation" name={name} object={object} />
            <TransformProperty mode="scale" name={name} object={object} />

            <PropertiesTableLeftColumn>Shadow</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <PropertiesCheckBoxInput
                        type="checkbox"
                        checked={castShadow}
                        onChange={handleCastShadowToggle}
                    />
                    <PropertiesInputLabel onClick={handleCastShadowToggle}>
                        Cast
                    </PropertiesInputLabel>
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <PropertiesCheckBoxInput
                        type="checkbox"
                        checked={receiveShadow}
                        onChange={handleReceiveShadowToggle}
                    />
                    <PropertiesInputLabel onClick={handleReceiveShadowToggle}>
                        Receive
                    </PropertiesInputLabel>
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>
        </>
    );
};
