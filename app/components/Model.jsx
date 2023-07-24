"use client";

import { useAnimations } from "@react-three/drei";
import {
    memo,
    startTransition,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";
import { Select } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";

import useStore from "@/app/utils/store";
import globalObject from "@/app/utils/globalObject";

const Model = ({ name, ...props }) => {
    const meshRef = useRef(null);

    const results = useStore((state) => state.results);
    const selectedObject = useStore((state) => state.selectedObject);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const setTransforms = useStore((state) => state.setTransforms);
    const scene = useStore((state) => state.scene);

    const { environmentIntensity } = scene.properties;

    const position = sceneCollection[name].transforms?.position;
    const rotation = sceneCollection[name].transforms?.rotation;
    const scale = sceneCollection[name].transforms?.scale;

    const gltf = results[name];
    const { castShadow, receiveShadow, visible, frustumCulled, renderOrder } = sceneCollection[name].properties;

    // TODO: Figure out how to effectively use nodes and materials like GLTFJSX https://github.com/pmndrs/gltfjsx/blob/master/src/utils/parser.js
    // so that users can add the same models to the scene many times without sacrificing performance
    // const { nodes, materials } = useGraph(scene);

    const gltfScene = gltf.scene;
    const animations = gltf.animations;
    const { actions } = useAnimations(animations, meshRef);

    const previousTransformRef = useRef({
        position: null,
        rotation: null,
        scale: null,
    });

    const handleTransformChange = () => {
        setTransforms({ name: name }, {
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
        });
    };

    const meshIsMoved = () => {
        if (!meshRef.current) return false;

        return (
            meshRef.current?.position.x !== 0 ||
            meshRef.current?.position.y !== 0 ||
            meshRef.current?.position.z !== 0 ||
            meshRef.current?.rotation.x !== 0 ||
            meshRef.current?.rotation.y !== 0 ||
            meshRef.current?.rotation.z !== 0 ||
            meshRef.current?.scale.x !== 1 ||
            meshRef.current?.scale.y !== 1 ||
            meshRef.current?.scale.z !== 1
        );
    };

    const setOutline = useCallback(
        (bool) => {
            if (!bool) {
                if (!selectedObject.object || !selectedObject.name) return;
                else startTransition(() => setSelectedObject({ objectRef: globalObject.scene }));
            } else {
                if (selectedObject.name === name) return;

                startTransition(() => {
                    setSelectedObject({ objectName: name, objectRef: meshRef.current });
                });
                if (meshIsMoved) {
                    startTransition(() => {
                        setTransforms({ name: name }, {
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
                        });
                    });
                }
            }
        },
        [setSelectedObject, setTransforms, selectedObject]
    );

    // play animations
    useLayoutEffect(() => {
        Object.keys(actions).forEach((action) => actions[action]?.play());

        // gltfScene.traverse((obj) => {
        //     if (obj.isMesh) {
        //         obj.castShadow = obj.receiveShadow = true;
        //         obj.material.envMapIntensity = environmentIntensity;
        //     }
        // });
    }, []);

    useEffect(() => {
        gltfScene.traverse((obj) => {
            if (obj.isMesh) {
                obj.material.envMapIntensity = environmentIntensity;
            }
        });
    }, [environmentIntensity]);

    useEffect(() => {
        gltfScene.traverse((obj) => {
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
        if (meshRef.current && selectedObject?.name === name) {
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
            <Select enabled={selectedObject?.name === name} dispose={null}>
                <primitive
                    ref={meshRef}
                    object={gltfScene}
                    position={position && [position.x, position.y, position.z]}
                    rotation={rotation && [rotation.x, rotation.y, rotation.z]}
                    scale={scale && [scale.x, scale.y, scale.z]}
                    dispose={null}
                    {...props}
                />
            </Select>
        </mesh>
    );
};

export default memo(Model);
