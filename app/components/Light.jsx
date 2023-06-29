"use client";

import { memo, useRef } from "react";
import {
    DirectionalLightHelper,
    HemisphereLightHelper,
    PointLightHelper,
    SpotLightHelper,
} from "three";
import { Select } from "@react-three/postprocessing";
import { useHelper } from "@react-three/drei";

const Light = ({ type, name, properties, ...props }) => {
    const lightRef = useRef(null);

    if (type === "DirectionalLight") {
        useHelper(lightRef, DirectionalLightHelper, 1);
    } else if (type === "HemisphereLight") {
        useHelper(lightRef, HemisphereLightHelper, 1);
    } else if (type === "PointLight") {
        useHelper(lightRef, PointLightHelper, 0.7, "white");
    } else if (type === "SpotLight") {
        useHelper(lightRef, SpotLightHelper, "white");
    }

    return (
        <Select dispose={null}>
            {type === "DirectionalLight" ? (
                <directionalLight
                    ref={lightRef}
                    name={name}
                    position={[3, 3, 3]}
                    {...properties}
                    {...props}
                    dispose={null}
                />
            ) : type === "HemisphereLight" ? (
                <hemisphereLight
                    ref={lightRef}
                    name={name}
                    position={[0, 10, 0]}
                    {...properties}
                    {...props}
                    dispose={null}
                />
            ) : type === "PointLight" ? (
                <pointLight
                    ref={lightRef}
                    name={name}
                    position={[3, 3, 3]}
                    {...properties}
                    {...props}
                    dispose={null}
                />
            ) : type === "SpotLight" ? (
                <spotLight
                    ref={lightRef}
                    name={name}
                    position={[3, 3, 3]}
                    {...properties}
                    {...props}
                    dispose={null}
                />
            ) : null}
        </Select>
    );
};

export default memo(Light);
