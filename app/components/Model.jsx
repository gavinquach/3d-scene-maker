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

import useStore from "../utils/store.js";
import useControlParams from "./Controls/ControlParams.jsx";

const Model = ({ gltf, name, properties, ...props }) => {
    const meshRef = useRef(null);

    const selectedObject = useStore((state) => state.selectedObject);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const setTransforms = useStore((state) => state.setTransforms);

    const { setLevaTransforms, envIntensity } = useControlParams();

    const position = sceneCollection[name]?.transforms?.position;
    const rotation = sceneCollection[name]?.transforms?.rotation;
    const scale = sceneCollection[name]?.transforms?.scale;

    // TODO: Figure out how to effectively use nodes and materials like GLTFJSX https://github.com/pmndrs/gltfjsx/blob/master/src/utils/parser.js
    // so that users can add the same models to the scene many times without sacrificing performance
    // const { nodes, materials } = useGraph(scene);

    const scene = gltf.scene;
    const animations = gltf.animations;
    const { actions } = useAnimations(animations, meshRef);

    const previousTransformRef = useRef({
        position: null,
        rotation: null,
        scale: null,
    });

    const handleSetLevaTransform = useCallback(() => {
        setLevaTransforms({
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
    }, [setLevaTransforms]);

    const handleTransformChange = () => {
        handleSetLevaTransform();
        setTransforms(name, {
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
                else startTransition(() => setSelectedObject(null));
            } else {
                if (selectedObject.name === name) return;

                setSelectedObject(name, meshRef.current);

                startTransition(() => {
                    if (meshIsMoved) {
                        setTransforms(name, {
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
                    }
                });
                handleSetLevaTransform();
            }
        },
        [setSelectedObject, setTransforms, selectedObject]
    );

    // play animations
    useLayoutEffect(() => {
        Object.keys(actions).forEach((action) => actions[action]?.play());

        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = obj.receiveShadow = true;
                obj.material.envMapIntensity = envIntensity;
            }
        });
    }, []);

    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = obj.receiveShadow = true;
                obj.material.envMapIntensity = envIntensity;
            }
        });
    }, [envIntensity]);

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
            {...properties}
            dispose={null}
        >
            <Select enabled={selectedObject?.name === name} dispose={null}>
                <primitive
                    ref={meshRef}
                    object={scene}
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
