import { FC, startTransition, useState } from "react";
import { Object3D } from "three";
import {
    PropertiesCheckBoxInput,
    PropertiesNumericInput,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "../PropertiesStyled.ts";
import useStore from "@/app/utils/store.js";

export const Object3DProperties: FC<{ name: string, object: Object3D }> = ({ name, object }) => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const updateObjectProperty = useStore((state) => state.updateObjectProperty);
    const scene = useStore((state) => state.scene);
    const updateSceneProperty = useStore((state) => state.updateSceneProperty);

    const properties = sceneCollection[name]?.properties || scene.properties;

    const [visible, setVisible] = useState<boolean>(properties.visible);
    const [frustumCulled, setFrustumCulled] = useState<boolean>(properties.frustumCulled);
    const [renderOrder, setRenderOrder] = useState<number>(properties.renderOrder);

    const handleVisibleToggle = () => {
        const value = !visible;
        setVisible(value);
        startTransition(() => {
            if (name) {
                updateObjectProperty(name, "visible", value);
            } else {
                updateSceneProperty("visible", value);
            }
        });
        object.visible = value;
    };
    const handleFrustumCulledToggle = () => {
        const value = !frustumCulled;
        setFrustumCulled(value);
        startTransition(() => {
            if (name) {
                updateObjectProperty(name, "frustumCulled", value);
            } else {
                updateSceneProperty("frustumCulled", value);
            }
        });
        object.frustumCulled = value;
    };
    const handleRenderOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value)) return;

        object.renderOrder = value;
        setRenderOrder(value);
        startTransition(() => {
            if (name) {
                updateObjectProperty(name, "renderOrder", value);
            } else {
                updateSceneProperty("renderOrder", value);
            }
        });
    };

    return (
        <>
            <PropertiesTableLeftColumn>Visible</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={visible}
                    onChange={handleVisibleToggle}
                />
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Frustum Cull</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={frustumCulled}
                    onChange={handleFrustumCulledToggle}
                />
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Render Order</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesNumericInput
                    type="number"
                    min={0}
                    defaultValue={renderOrder}
                    onChange={handleRenderOrderChange}
                />
            </PropertiesTableRightColumn>
        </>
    );
};
