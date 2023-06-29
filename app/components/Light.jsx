"use client";

import {
    memo,
    startTransition,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
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
    const [lightComponent, setLightComponent] = useState(null);

    console.log(type, name, properties);

    switch (type) {
        case "DirectionalLight":
            console.log("asdflk;jasdf;lkj");
            startTransition(() => {
                setLightComponent(
                    <directionalLight
                        ref={lightRef}
                        name={name}
                        position={[3, 3, 3]}
                        {...props}
                        dispose={null}
                    />
                );
            });
            useHelper(lightRef, DirectionalLightHelper, 1);
            break;
        case "HemisphereLight":
            setLightComponent(
                <hemisphereLight
                    ref={lightRef}
                    name={name}
                    position={[0, 10, 0]}
                    {...props}
                    dispose={null}
                />
            );
            useHelper(lightRef, HemisphereLightHelper, 1);
            break;
        case "PointLight":
            setLightComponent(
                <pointLight
                    ref={lightRef}
                    name={name}
                    position={[3, 3, 3]}
                    {...props}
                    dispose={null}
                />
            );
            useHelper(lightRef, PointLightHelper, 0.7, "white");
            break;
        case "SpotLight":
            setLightComponent(
                <spotLight
                    ref={lightRef}
                    name={name}
                    position={[3, 3, 3]}
                    {...props}
                    dispose={null}
                />
            );
            useHelper(lightRef, SpotLightHelper, "white");
            break;
        default:
            break;
    }

    useLayoutEffect(() => {
        console.log(lightComponent);
    }, [lightComponent]);

    return <Select dispose={null}>{lightComponent}</Select>;
};

export default memo(Light);
