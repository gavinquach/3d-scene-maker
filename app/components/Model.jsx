"use client";

import { useAnimations } from "@react-three/drei";
import { memo, startTransition, useLayoutEffect, useRef, useState } from "react";
import { Select } from "@react-three/postprocessing";
import useStore from "../utils/store";
import ControlParams from "./Controls/ControlParams.jsx";

const Model = ({ result, name, ...props }) => {
    const mesh = useRef();
    const [hovered, hover] = useState(null);

    const setSelectedMesh = useStore((state) => state.setSelectedMesh);

    // const { position, rotation, scale } = ControlParams();

    const { scene, animations } = result;
    const { actions } = useAnimations(animations, mesh);

    const setOutline = (bool) => {
        hover(bool);
        startTransition(() => {
            setSelectedMesh(bool ? mesh : null);
        }, [setSelectedMesh]);
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
    }, [actions, scene]);

    return (
        <Select enabled={hovered}>
            <group>

            </group>
            <primitive
                object={scene}
                ref={mesh}
                name={name}
                onClick={() => setOutline(true)}
                onPointerMissed={() => setOutline(false)}
                // position={[position.x, position.y, position.z]}
                // rotation={[rotation.x, rotation.y, rotation.z]}
                // scale={[scale.x, scale.y, scale.z]}
                {...props}
                dispose={null}
            />
        </Select>
    );
};

export default memo(Model);
