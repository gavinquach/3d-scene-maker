import { FC, startTransition, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { OrbitControls, RGBELoader } from "three-stdlib";

import globalObject from "@/app/utils/globalObject.ts";
import useStore from "@/app/utils/store.js";
import { ENVMAP_LIST } from "@/app/utils/constants.ts";

// Preload envmaps to avoid long loading time when switching envmaps
const rgbeLoader = new RGBELoader();
for (const [_, path] of Object.entries(ENVMAP_LIST)) {
    rgbeLoader.load(path, () => { });
}

export const AssignSceneToGlobal: FC = () => {
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);
    const controls = useThree((state) => state.controls);
    const gl = useThree((state) => state.gl);

    const sceneFromStore = useStore((state) => state.scene);
    const setSelectedObject = useStore((state) => state.setSelectedObject);

    const { castShadow, receiveShadow, visible, frustumCulled, renderOrder } = sceneFromStore.properties;

    useLayoutEffect(() => {
        // scene.traverse((child) => {
        //     console.log("child", child);
        // });
        // console.log("End of child objects");
        // console.log("================================================================");

        scene.castShadow = castShadow;
        scene.receiveShadow = receiveShadow;
        scene.visible = visible;
        scene.frustumCulled = frustumCulled;
        scene.renderOrder = renderOrder;

        globalObject.scene = scene;
        globalObject.camera = camera as PerspectiveCamera;
        globalObject.controls = controls as OrbitControls;
        globalObject.renderer = gl;

        // set Threejs Scene as default object
        startTransition(() => {
            setSelectedObject({ objectRef: scene });
        });
        return () => {
            globalObject.scene = null;
            globalObject.camera = null;
            globalObject.controls = null;
            globalObject.renderer = null;
        };
    }, [camera, controls, gl, scene]);

    return <></>;
};
