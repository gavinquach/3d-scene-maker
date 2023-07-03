"use client";

import {
    memo,
    startTransition,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import {
    DirectionalLightHelper,
    PointLightHelper,
    SpotLightHelper,
} from "three";
import { extend, useFrame } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";

import useStore from "../utils/store.js";

extend({ DirectionalLightHelper, PointLightHelper, SpotLightHelper });

const Light = ({ name, transforms, attributes, properties, ...props }) => {
    const { type } = attributes;

    const [hasLight, setHasLight] = useState(false);
    const lightRef = useRef(null);

    const selectedObject = useStore((state) => state.selectedObject);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const setTransforms = useStore((state) => state.setTransforms);

    const position = sceneCollection[name]?.transforms?.position;
    const rotation = sceneCollection[name]?.transforms?.rotation;

    const previousTransformRef = useRef({
        position: null,
        rotation: null,
    });

    const isMoved = () => {
        if (!lightRef.current) return false;

        return (
            lightRef.current?.position.x !== 0 ||
            lightRef.current?.position.y !== 0 ||
            lightRef.current?.position.z !== 0 ||
            lightRef.current?.rotation.x !== 0 ||
            lightRef.current?.rotation.y !== 0 ||
            lightRef.current?.rotation.z !== 0
        );
    };

    const setOutline = useCallback(
        (bool) => {
            if (!bool) {
                if (selectedObject.object === null || selectedObject.name === null)
                    return;
                else startTransition(() => setSelectedObject(null));
            } else {
                setSelectedObject(name, lightRef.current);
                if (isMoved) {
                    startTransition(() => {
                        setTransforms(name, {
                            position: {
                                x: lightRef.current?.position.x,
                                y: lightRef.current?.position.y,
                                z: lightRef.current?.position.z,
                            },
                            rotation: {
                                x: lightRef.current?.rotation.x,
                                y: lightRef.current?.rotation.y,
                                z: lightRef.current?.rotation.z,
                            },
                            scale: {
                                x: lightRef.current?.scale.x,
                                y: lightRef.current?.scale.y,
                                z: lightRef.current?.scale.z,
                            },
                        });
                    });
                }
            }
        },
        [setSelectedObject, setTransforms, selectedObject]
    );

    useLayoutEffect(() => {
        setHasLight(true);
    }, []);

    // Use the useFrame hook to check for transform changes
    useFrame(() => {
        if (lightRef.current && selectedObject.name === name) {
            const { position, rotation, scale } = lightRef.current;
            const previousTransform = previousTransformRef.current;

            // Check if the transform has changed
            if (
                previousTransform &&
                ((previousTransform.position &&
                    !position.equals(previousTransform.position)) ||
                    (previousTransform.rotation &&
                        !rotation.equals(previousTransform.rotation)) ||
                    (previousTransform.scale && !scale.equals(previousTransform.scale)))
            ) {
                setTransforms(name, {
                    position: {
                        x: lightRef.current?.position.x,
                        y: lightRef.current?.position.y,
                        z: lightRef.current?.position.z,
                    },
                    rotation: {
                        x: lightRef.current?.rotation.x,
                        y: lightRef.current?.rotation.y,
                        z: lightRef.current?.rotation.z,
                    },
                });
            }

            // Update the previous transform reference
            previousTransformRef.current = {
                position: position.clone(),
                rotation: rotation.clone(),
                scale: scale.clone(),
            };
        }
    });

    return (
        <Select dispose={null}>
            {type === "DirectionalLight" ? (
                <>
                    <directionalLight
                        ref={lightRef}
                        name={name}
                        position={position && [position.x, position.y, position.z]}
                        rotation={rotation && [rotation.x, rotation.y, rotation.z]}
                        {...properties}
                        {...props}
                        dispose={null}
                    />
                    {hasLight && (
                        <directionalLightHelper
                            args={[lightRef.current, 1]}
                            onClick={() => setOutline(true)}
                            onPointerMissed={() => setOutline(false)}
                            dispose={null}
                        />
                    )}
                </>
            ) : type === "PointLight" ? (
                <>
                    <pointLight
                        ref={lightRef}
                        name={name}
                        position={position && [position.x, position.y, position.z]}
                        rotation={rotation && [rotation.x, rotation.y, rotation.z]}
                        {...properties}
                        {...props}
                        dispose={null}
                    />
                    {hasLight && (
                        <pointLightHelper
                            args={[lightRef.current, 0.7, "white"]}
                            onClick={() => setOutline(true)}
                            onPointerMissed={() => setOutline(false)}
                            dispose={null}
                        />
                    )}
                </>
            ) : type === "SpotLight" ? (
                <>
                    <spotLight
                        ref={lightRef}
                        name={name}
                        position={position && [position.x, position.y, position.z]}
                        rotation={rotation && [rotation.x, rotation.y, rotation.z]}
                        {...properties}
                        {...props}
                        dispose={null}
                    />
                    {hasLight && (
                        <spotLightHelper
                            args={[lightRef.current, "white"]}
                            onClick={() => setOutline(true)}
                            onPointerMissed={() => setOutline(false)}
                            dispose={null}
                        />
                    )}
                </>
            ) : null}
        </Select>
    );
};

export default memo(Light);
