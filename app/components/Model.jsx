"use client";

import { useAnimations } from "@react-three/drei";
import { memo, useLayoutEffect, useRef, useState } from "react";
import { Select } from "@react-three/postprocessing";
import useStore from "./store";

const Model = ({ result, name, ...props }) => {
    const mesh = useRef();
    const [hovered, hover] = useState(null);

    const setSelectedMesh = useStore((state) => state.setSelectedMesh);

    const { scene, animations } = result;
    const { actions } = useAnimations(animations, mesh);

    const setOutline = (bool) => {
        hover(bool);
        setSelectedMesh(bool ? mesh : null);
    };

    // play animations
    useLayoutEffect(() => {
        Object.keys(actions).forEach((action) => actions[action]?.play());

        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = obj.receiveShadow = true;
                obj.material.envMapIntensity = 0.5;
            }
        });
        console.log(mesh.current);
    }, [actions, scene]);

    return (
        <>
            <Select enabled={hovered}>
                <primitive
                    object={scene}
                    ref={mesh}
                    name={name}
                    onClick={() => setOutline(true)}
                    onPointerMissed={() => setOutline(false)}
                    {...props}
                    dispose={null}
                />
            </Select>
        </>
    );
};

export default memo(Model);
