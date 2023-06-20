"use client";

import { TransformControls, useAnimations } from "@react-three/drei";
import {
    memo,
    startTransition,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { Select } from "@react-three/postprocessing";
import useStore from "../utils/store.js";
import ControlParams from "./Controls/ControlParams.jsx";

const Model = ({ gltf, name, ...props }) => {
    const mesh = useRef(null);
    const [hovered, hover] = useState(null);

    const setSelectedMesh = useStore((state) => state.setSelectedMesh);

    const { position, rotation, scale, envIntensity } = ControlParams();

    const { scene, animations } = gltf;
    const { actions } = useAnimations(animations, mesh);

    const setOutline = (bool) => {
        hover(bool);
        startTransition(() => {
            setSelectedMesh(bool ? mesh?.current : null);
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

    return (
        <Select enabled={hovered} {...props} dispose={null}>
            <primitive
                object={scene}
                ref={mesh}
                name={name}
                onClick={() => setOutline(true)}
                onPointerMissed={() => setOutline(false)}
            // position={[position.x, position.y, position.z]}
            // rotation={[rotation.x, rotation.y, rotation.z]}
            // scale={[scale.x, scale.y, scale.z]}
            />
        </Select>
    );
};

export default memo(Model);
