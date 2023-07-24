"use client";

import { useAnimations } from "@react-three/drei";
import {
    memo,
    startTransition,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from "react";
import { Select } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";

import useStore from "@/app/utils/store";
import globalObject from "@/app/utils/globalObject";
import { isObjectMoved, setGLTFEnvIntensity } from "@/app/utils/functions";

const Model = ({ name, gltf, envIntensity, ...props }) => {
    const meshRef = useRef(null);

    const selectedObject = useStore((state) => state.selectedObject);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const updateTransforms = useStore((state) => state.updateTransforms);

    const position = sceneCollection[name]?.transforms.position;
    const rotation = sceneCollection[name]?.transforms.rotation;
    const scale = sceneCollection[name]?.transforms.scale;

    const { castShadow, receiveShadow, visible, frustumCulled, renderOrder } =
        sceneCollection[name]?.properties;

    const { scene, animations } = useMemo(() => gltf, []);
    const { actions } = useAnimations(animations, meshRef);

    const previousTransformRef = useRef({
        position: null,
        rotation: null,
        scale: null,
    });

    const handleTransformChange = useCallback(() => {
        updateTransforms(
            { name: name },
            {
                position: {
                    x: meshRef.current?.position.x,
                    y: meshRef.current?.position.y,
                    z: meshRef.current?.position.z,
                },
                rotation: {
                    x: meshRef.current?.rotation.x,
                    y: meshRef.current?.rotation.y,
                    z: meshRef.current?.rotation.z,
                },
                scale: {
                    x: meshRef.current?.scale.x,
                    y: meshRef.current?.scale.y,
                    z: meshRef.current?.scale.z,
                },
            }
        );
    }, []);

    const setOutline = useCallback(
        (bool) => {
            if (!bool) {
                if (!selectedObject.object || !selectedObject.name) return;
                else
                    startTransition(() =>
                        setSelectedObject({ objectRef: globalObject.scene })
                    );
            } else {
                if (selectedObject.name === name) return;

                startTransition(() => {
                    setSelectedObject({ objectName: name, objectRef: meshRef.current });
                });
                if (isObjectMoved(meshRef.current)) {
                    startTransition(() => {
                        updateTransforms(
                            { name: name },
                            {
                                position: {
                                    x: meshRef.current?.position.x,
                                    y: meshRef.current?.position.y,
                                    z: meshRef.current?.position.z,
                                },
                                rotation: {
                                    x: meshRef.current?.rotation.x,
                                    y: meshRef.current?.rotation.y,
                                    z: meshRef.current?.rotation.z,
                                },
                                scale: {
                                    x: meshRef.current?.scale.x,
                                    y: meshRef.current?.scale.y,
                                    z: meshRef.current?.scale.z,
                                },
                            }
                        );
                    });
                }
            }
        },
        [setSelectedObject, updateTransforms, selectedObject]
    );

    // play animations
    useEffect(() => {
        Object.keys(actions).forEach((action) => actions[action]?.play());
        setGLTFEnvIntensity(meshRef.current, envIntensity);
    }, []);

    useEffect(() => {
        setGLTFEnvIntensity(meshRef.current, envIntensity);
    }, [envIntensity]);

    useEffect(() => {
        console.log("properties changed");
        // console.log("castShadow", castShadow);
        // console.log("receiveShadow", receiveShadow);
        // console.log("visible", visible);
        // console.log("frustumCulled", frustumCulled);
        // console.log("renderOrder", renderOrder);

        meshRef.current?.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = castShadow;
                obj.receiveShadow = receiveShadow;
                obj.visible = visible;
                obj.frustumCulled = frustumCulled;
                obj.renderOrder = renderOrder;
            }
        });
    }, [castShadow, receiveShadow, visible, frustumCulled, renderOrder]);

    // Use the useFrame hook to check for transform changes
    useFrame(() => {
        if (!meshRef.current) return;
        if (selectedObject?.name === name) {
            const { position, rotation, scale } = meshRef.current;
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
                handleTransformChange();
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
        <mesh
            name={name}
            onClick={() => setOutline(true)}
            onPointerMissed={() => setOutline(false)}
            dispose={null}
        >
            <Select enabled={selectedObject?.name === name}>
                <primitive
                    ref={meshRef}
                    object={scene}
                    position={position && [position.x, position.y, position.z]}
                    rotation={rotation && [rotation.x, rotation.y, rotation.z]}
                    scale={scale && [scale.x, scale.y, scale.z]}
                    {...props}
                />
            </Select>
        </mesh>
    );
};

export default memo(Model);
