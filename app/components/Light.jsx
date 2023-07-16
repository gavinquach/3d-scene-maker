"use client";

import {
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

import useStore from "../utils/store";

extend({ DirectionalLightHelper, PointLightHelper, SpotLightHelper });

export const Light = ({ name, transforms, type, properties, ...props }) => {
    const [hasLight, setHasLight] = useState(false);
    const lightRef = useRef(null);

    const selectedObject = useStore((state) => state.selectedObject);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const setTransforms = useStore((state) => state.setTransforms);

    const previousTransformRef = useRef({
        position: null,
    });

    const {
        color,
        intensity,
        distance,
        angle,
        penumbra,
        decay,
        castShadow,
        target,
        isDirectionalLight,
        isSpotLight,
        power,
    } = properties;

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
                else startTransition(() => setSelectedObject({ objectName: "" }));
            } else {
                if (selectedObject.name === name) return;

                startTransition(() => {
                    setSelectedObject({ objectName: name, objectRef: lightRef.current });
                });
                if (isMoved) {
                    startTransition(() => {
                        setTransforms(
                            { name: name },
                            {
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
                            }
                        );
                    });
                }
            }
        },
        [setSelectedObject, setTransforms, selectedObject]
    );

    useLayoutEffect(() => {
        setHasLight(true);

        if ((type === "DirectionalLight" || type === "SpotLight") && target) {
            console.log(lightRef.current);
            lightRef.current?.target?.position.set(target.x, target.y, target.z);
        }
    }, []);

    // Use the useFrame hook to check for transform changes
    useFrame(() => {
        if (lightRef.current && selectedObject.name === name) {
            const { position } = lightRef.current;
            const previousTransform = previousTransformRef.current;

            // Check if the transform has changed
            if (
                previousTransform &&
                previousTransform.position &&
                !position.equals(previousTransform.position)
            ) {
                setTransforms(
                    { name: name },
                    {
                        position: {
                            x: lightRef.current?.position.x,
                            y: lightRef.current?.position.y,
                            z: lightRef.current?.position.z,
                        },
                    }
                );
            }

            // Update the previous transform reference
            previousTransformRef.current = {
                position: position.clone(),
            };
        }
    });

    const DIRECTIONAL_LIGHT = (
        <>
            <directionalLight
                ref={lightRef}
                name={name}
                castShadow={castShadow}
                isDirectionalLight={isDirectionalLight}
                position={[
                    transforms.position.x,
                    transforms.position.y,
                    transforms.position.z,
                ]}
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
    );

    const POINT_LIGHT = (
        <>
            <pointLight
                ref={lightRef}
                name={name}
                castShadow={castShadow}
                color={color}
                decay={decay}
                distance={distance}
                intensity={intensity}
                power={power}
                position={[
                    transforms.position.x,
                    transforms.position.y,
                    transforms.position.z,
                ]}
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
    );

    const SPOT_LIGHT = (
        <>
            <spotLight
                ref={lightRef}
                name={name}
                castShadow={castShadow}
                angle={angle}
                color={color}
                intensity={intensity}
                distance={distance}
                penumbra={penumbra}
                decay={decay}
                isSpotLight={isSpotLight}
                power={power}
                position={[
                    transforms.position.x,
                    transforms.position.y,
                    transforms.position.z,
                ]}
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
    );

    return (
        <Select dispose={null}>
            {type === "DirectionalLight" && DIRECTIONAL_LIGHT}
            {type === "PointLight" && POINT_LIGHT}
            {type === "SpotLight" && SPOT_LIGHT}
        </Select>
    );
};
