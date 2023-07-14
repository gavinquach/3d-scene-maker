import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { Object3D } from "three";
import {
    PropertiesCheckBoxInput,
    PropertiesInputLabel,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "../PropertiesStyled.ts";

const PositionProperties = dynamic(() =>
    import("./TransformProperties.tsx").then((mod) => mod.PositionProperties)
);
const RotationProperties = dynamic(() =>
    import("./TransformProperties.tsx").then((mod) => mod.RotationProperties)
);
const ScaleProperties = dynamic(() =>
    import("./TransformProperties.tsx").then((mod) => mod.ScaleProperties)
);

export const Object3DProperties: FC<{ object: Object3D }> = ({ object }) => {
    const [value, setValue] = useState<boolean>(false);
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
                        checked={object.castShadow === true}
                        onChange={() => {
                            object.castShadow = !object.castShadow;
                            setValue(!value);
                        }}
                    />
                    <PropertiesInputLabel>Cast</PropertiesInputLabel>
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <PropertiesCheckBoxInput
                        type="checkbox"
                        checked={object.receiveShadow === true}
                        onChange={() => {
                            object.receiveShadow = !object.receiveShadow;
                            setValue(!value);
                        }}
                    />
                    <PropertiesInputLabel>Receive</PropertiesInputLabel>
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Visible</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={object.visible === true}
                    onChange={() => {
                        object.visible = !object.visible;
                        setValue(!value);
                    }}
                />
            </PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Frustum Cull</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesCheckBoxInput
                    type="checkbox"
                    checked={object.frustumCulled === true}
                    onChange={() => {
                        object.frustumCulled = !object.frustumCulled;
                        setValue(!value);
                    }}
                />
            </PropertiesTableRightColumn>
        </>
    );
};
