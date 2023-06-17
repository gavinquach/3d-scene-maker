"use client";

import { TransformControls, useAnimations } from "@react-three/drei";
import { memo, useLayoutEffect, useRef } from "react";

const Model = ({ result, name, ...props }) => {
    const group = useRef();
    const { scene, animations } = result;
    const { actions } = useAnimations(animations, group);

    // play animations
    useLayoutEffect(() => {
        Object.keys(actions).forEach((action) => actions[action]?.play());

        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = obj.receiveShadow = true;
                obj.material.envMapIntensity = 0.5;
            }
        });
    }, [actions, scene]);

    return (
        <>
            <group ref={group} name={name} {...props} dispose={null}>
                <primitive object={scene} />
            </group>
            <TransformControls object={group} />
        </>
    );
};

export default memo(Model);
