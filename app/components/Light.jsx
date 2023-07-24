"use client";

import {
    memo,
    startTransition,
    useCallback,
    useEffect,
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

import useStore from "@/app/utils/store";
import globalObject from "@/app/utils/globalObject";
import { isObjectMoved } from "@/app/utils/functions";

extend({ DirectionalLightHelper, PointLightHelper, SpotLightHelper });

const Light = ({ name, ...props }) => {
    const [hasLight, setHasLight] = useState(false);
    const lightRef = useRef(null);
    const lightHelperRef = useRef(null);

    const sceneCollection = useStore((state) => state.sceneCollection);
    const selectedObject = useStore((state) => state.selectedObject);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const setLightHelper = useStore((state) => state.setLightHelper);
    const updateTransforms = useStore((state) => state.updateTransforms);

    const previousTransformRef = useRef({
        position: null,
    });

    const type = sceneCollection[name]?.type;
    const transforms = sceneCollection[name]?.transforms;
    const properties = sceneCollection[name]?.properties;

    // const {
    //     color,
    //     intensity,
    //     castShadow,
    //     shadowBias,
    //     shadowNormalBias,
    //     angle,
    //     decay,
    //     distance,
    //     penumbra,
    //     target,
    //     power,
    // } = properties;

    const setOutline = useCallback(
        (bool) => {
            if (!bool) {
                if (selectedObject.object === null || selectedObject.name === null)
                    return;
                else
                    startTransition(() =>
                        setSelectedObject({ objectRef: globalObject.scene })
                    );
            } else {
                if (selectedObject.name === name) return;

                startTransition(() => {
                    setSelectedObject({ objectName: name, objectRef: lightRef.current });
                });
                if (isObjectMoved(lightRef.current)) {
                    startTransition(() => {
                        updateTransforms(
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
        [setSelectedObject, updateTransforms, selectedObject]
    );

    useLayoutEffect(() => {
        setHasLight(true);

        // set light target
        if (
            (type === "DirectionalLight" || type === "SpotLight") &&
            properties?.target
        ) {
            lightRef.current?.target?.position.set(
                properties.target.x,
                properties.target.y,
                properties.target.z
            );
        }
    }, []);

    // set helper
    useEffect(() => {
        if (hasLight) {
            setLightHelper(name, lightHelperRef.current);
        }
    }, [hasLight]);

    // Use the useFrame hook to check for transform changes
    useFrame(() => {
        if (!lightRef.current) return;
        if (selectedObject.name === name) {
            const { position } = lightRef.current;
            const previousTransform = previousTransformRef.current;

            // Check if the transform has changed
            if (
                previousTransform?.position &&
                !position.equals(previousTransform.position)
            ) {
                lightHelperRef.current?.update();
                updateTransforms(
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
                castShadow={properties.castShadow}
                position={[
                    transforms.position.x,
                    transforms.position.y,
                    transforms.position.z,
                ]}
                shadow-bias={properties.shadowBias}
                shadow-normalBias={properties.shadowNormalBias}
                {...props}
                dispose={null}
            />
            {hasLight && (
                <directionalLightHelper
                    args={[lightRef.current, 1]}
                    ref={lightHelperRef}
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
                castShadow={properties.castShadow}
                color={properties.color}
                decay={properties.decay}
                distance={properties.distance}
                intensity={properties.intensity}
                power={properties.power}
                shadow-bias={properties.shadowBias}
                shadow-normalBias={properties.shadowNormalBias}
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
                    ref={lightHelperRef}
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
                castShadow={properties.castShadow}
                angle={properties.angle}
                color={properties.color}
                intensity={properties.intensity}
                distance={properties.distance}
                penumbra={properties.penumbra}
                decay={properties.decay}
                power={properties.power}
                shadow-bias={properties.shadowBias}
                shadow-normalBias={properties.shadowNormalBias}
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
                    ref={lightHelperRef}
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

export default memo(Light);
