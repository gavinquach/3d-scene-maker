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

const Model = ({ gltf, name, ...props }) => {
    const mesh = useRef(null);

    const selectedMesh = useStore((state) => state.selectedMesh);
    const setSelectedMesh = useStore((state) => state.setSelectedMesh);
    const setTransforms = useStore((state) => state.setTransforms);
    const meshTransforms = useStore((state) => state.meshTransforms);

    const { setLevaTransforms, envIntensity } = useControlParams();

    const position = meshTransforms[name]?.position;
    const rotation = meshTransforms[name]?.rotation;
    const scale = meshTransforms[name]?.scale;

    const scene = useCallback(gltf.scene, [gltf.scene]);
    const animations = useCallback(gltf.animations, [gltf.animations]);

    // TODO: Figure out how to effectively use nodes and materials like GLTFJSX https://github.com/pmndrs/gltfjsx/blob/master/src/utils/parser.js
    // so that users can add the same models to the scene many times without sacrificing performance
    // const { nodes, materials } = useGraph(scene);

    const { actions } = useAnimations(animations, mesh);

    const previousTransformRef = useRef({
        position: null,
        rotation: null,
        scale: null,
    });

    const handleSetLevaTransform = () => {
        setLevaTransforms({
            position: {
                x: mesh.current?.position.x,
                y: mesh.current?.position.y,
                z: mesh.current?.position.z,
            },
            rotation: {
                x: mesh.current?.rotation.x,
                y: mesh.current?.rotation.y,
                z: mesh.current?.rotation.z,
            },
            scale: {
                x: mesh.current?.scale.x,
                y: mesh.current?.scale.y,
                z: mesh.current?.scale.z,
            },
        });
    };

    const handleTransformChange = () => {
        handleSetLevaTransform();
        setTransforms(name, {
            position: {
                x: mesh.current?.position.x,
                y: mesh.current?.position.y,
                z: mesh.current?.position.z,
            },
            rotation: {
                x: mesh.current?.rotation.x,
                y: mesh.current?.rotation.y,
                z: mesh.current?.rotation.z,
            },
            scale: {
                x: mesh.current?.scale.x,
                y: mesh.current?.scale.y,
                z: mesh.current?.scale.z,
            },
        });
    };

    const setOutline = (bool) => {
        startTransition(() => {
            if (bool) {
                setSelectedMesh(mesh?.current, name);
                if (
                    mesh.current?.position.x !== 0 ||
                    mesh.current?.position.y !== 0 ||
                    mesh.current?.position.z !== 0 ||
                    mesh.current?.rotation.x !== 0 ||
                    mesh.current?.rotation.y !== 0 ||
                    mesh.current?.rotation.z !== 0 ||
                    mesh.current?.scale.x !== 1 ||
                    mesh.current?.scale.y !== 1 ||
                    mesh.current?.scale.z !== 1
                ) {
                    setTransforms(name, {
                        position: {
                            x: mesh.current?.position.x,
                            y: mesh.current?.position.y,
                            z: mesh.current?.position.z,
                        },
                        rotation: {
                            x: mesh.current?.rotation.x,
                            y: mesh.current?.rotation.y,
                            z: mesh.current?.rotation.z,
                        },
                        scale: {
                            x: mesh.current?.scale.x,
                            y: mesh.current?.scale.y,
                            z: mesh.current?.scale.z,
                        },
                    });
                }
            } else {
                setSelectedMesh(null, null);
            }
            handleSetLevaTransform();
        });
    };

    // play animations
    useLayoutEffect(() => {
        Object.keys(actions).forEach((action) => actions[action]?.play());

        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = obj.receiveShadow = true;
                obj.material.envMapIntensity = envIntensity;
            }
        });
    }, [actions, scene]);

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
        if (mesh.current && selectedMesh?.name === name) {
            const { position, rotation, scale } = mesh.current;
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
        <Select enabled={selectedMesh?.name === name} {...props} dispose={null}>
            <primitive
                object={scene}
                ref={mesh}
                name={name}
                onClick={() => setOutline(true)}
                onPointerMissed={() => setOutline(false)}
                position={position ? [position.x, position.y, position.z] : [0, 0, 0]}
                rotation={rotation ? [rotation.x, rotation.y, rotation.z] : [0, 0, 0]}
                scale={scale ? [scale.x, scale.y, scale.z] : [1, 1, 1]}
            />
        </Select>
    );
};

export default memo(Model);
