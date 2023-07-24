import dynamic from "next/dynamic";
import {
    AdaptiveDpr,
    // BakeShadows,
    // ContactShadows,
    Environment,
    OrbitControls,
    Preload,
    TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { startTransition, Suspense, useEffect } from "react";
import { Perf } from "r3f-perf";
import {
    Selection,
    EffectComposer,
    Outline,
    SMAA,
} from "@react-three/postprocessing";

import OrbitGizmo from "../OrbitGizmo/OrbitGizmo.jsx";
import useStore from "@/app/utils/store.js";
import globalObject from "@/app/utils/globalObject.ts";
import { PERFORMANCE_SETTINGS } from "@/app/utils/constants.ts";
import { generateRandomString } from "@/app/utils/functions.ts";

const AssignSceneToGlobal = dynamic(
    () =>
        import("./AssignSceneToGlobal.tsx").then((mod) => mod.AssignSceneToGlobal),
    { ssr: true }
);
const Light = dynamic(() => import("../Light.jsx").then((mod) => mod.default), {
    ssr: true,
});
const Model = dynamic(() => import("../Model.jsx").then((mod) => mod.default), {
    ssr: true,
});

export const Viewer: React.FC = () => {
    const loadGLTF = useStore((state) => state.loadGLTF);
    const files = useStore((state) => state.files);
    const results = useStore((state) => state.results);
    const selectedObject = useStore((state) => state.selectedObject);
    const transformMode = useStore((state) => state.transformMode);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const scene = useStore((state) => state.scene);

    const { environment, environmentBackground, environmentIntensity } =
        scene.properties;

    // generate scene whenever file array is changed
    useEffect(() => {
        if (files.length === 0) return;

        if (!globalObject.canGenerate) {
            globalObject.canGenerate = true;
            return;
        }

        startTransition(() => {
            loadGLTF();
        });
    }, [files, loadGLTF]);

    return (
        <Canvas
            gl={{ preserveDrawingBuffer: true }}
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [6, 5, -10], fov: 50, near: 0.01, far: 500 }}
            performance={PERFORMANCE_SETTINGS}
        >
            <color attach="background" args={["#3B3B3B"]} />

            <AssignSceneToGlobal />
            <Perf position="bottom-left" />

            <OrbitGizmo />
            <gridHelper args={[1000, 1000, 0x000000, 0x808080]} />

            {environment && (
                <Environment
                    background={environmentBackground === true}
                    files={environment}
                />
            )}
            <ambientLight intensity={0.3} name="AmbientLight" />

            <OrbitControls makeDefault />

            <Suspense fallback={null}>
                <Selection>
                    <EffectComposer multisampling={0} autoClear={false}>
                        <SMAA />
                        <Outline
                            blur
                            visibleEdgeColor={0xffa500}
                            edgeStrength={100}
                            width={1000}
                        />
                    </EffectComposer>

                    {Object.keys(sceneCollection).length > 0 &&
                        Object.keys(sceneCollection).map(
                            (name) =>
                                sceneCollection[name].category === "light" && (
                                    <Light key={name + generateRandomString(5)} name={name} />
                                )
                        )}

                    {Object.keys(results).length > 0 &&
                        Object.keys(results).map((name) => (
                            <Model
                                key={name + generateRandomString(5)}
                                name={name}
                                gltf={results[name]}
                                envIntensity={environmentIntensity}
                            />
                        ))}
                </Selection>

                {selectedObject?.object && (
                    <TransformControls
                        object={selectedObject.objRef || null}
                        enabled={selectedObject.objRef ? true : false}
                        mode={transformMode || "translate"}
                    />
                )}

                {/* <ContactShadows
                    frames={1}
                    position={[0, -0.1, 0]}
                    opacity={0.75}
                    scale={15}
                    blur={2}
                    far={6}
                />
                <BakeShadows /> */}
            </Suspense>
            <Preload all />
            <AdaptiveDpr pixelated />
        </Canvas>
    );
};
