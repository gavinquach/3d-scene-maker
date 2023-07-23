import { FC, startTransition, useState } from "react";
import { Object3D, Scene } from "three";
import {
    PropertiesCheckBoxInput,
    PropertiesInputLabel,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../../PropertiesStyled.ts";
import { PositionProperties } from "../TransformProperties.tsx";
import { RotationProperties } from "../TransformProperties.tsx";
import { ScaleProperties } from "../TransformProperties.tsx";
import useStore from "@/app/utils/store.js";

export const MeshProperties: FC<{ name: string; object: Object3D }> = ({
    name,
    object,
}) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setObjectProperty = useStore((state) => state.setObjectProperty);
    const scene = useStore((state) => state.scene);
    const setSceneProperties = useStore((state) => state.setSceneProperties);

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
                setObjectProperty(name, "castShadow", value);
            } else {
                setSceneProperties("castShadow", value);
            }
        });
        object.castShadow = value;
    };

    const handleReceiveShadowToggle = () => {
        const value = !receiveShadow;
        setReceiveShadow(value);
        startTransition(() => {
            if (name) {
                setObjectProperty(name, "receiveShadow", value);
            } else {
                setSceneProperties("receiveShadow", value);
            }
        });
        object.receiveShadow = value;
    };

    return (
        <>
            <PositionProperties />
            <RotationProperties />
            <ScaleProperties />

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
