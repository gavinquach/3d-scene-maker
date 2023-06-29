"use client";

import {
    AmbientLight,
    DirectionalLight,
    // HemisphereLight,
    PointLight,
    SpotLight,
    DirectionalLightHelper,
    HemisphereLightHelper,
    PointLightHelper,
    SpotLightHelper,
} from 'three';
import {
    memo,
    startTransition,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";
import { Select } from "@react-three/postprocessing";

import useStore from "../utils/store.js";

const Light = ({ type, ...props }) => {
    return (
        <group dispose={null}>
            <Select>

            </Select>
        </group>
    );
};

export default memo(Light);
