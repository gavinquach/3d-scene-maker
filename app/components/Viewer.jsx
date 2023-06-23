"use client";

import {
    AdaptiveDpr,
    // BakeShadows,
    // ContactShadows,
    Environment,
    OrbitControls,
    TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { memo, startTransition, Suspense, useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import {
    Selection,
    EffectComposer,
    Outline,
} from "@react-three/postprocessing";

import useControlParams from "./Controls/ControlParams.jsx";
import useStore from "../utils/store.js";
import Model from "./Model.jsx";
import OrbitGizmo from "./OrbitGizmo/OrbitGizmo.jsx";
// import { schadowplatz_1k } from "../assets/images";

const Viewer = () => {
    const blockGenerateScene = useStore((state) => state.blockGenerateScene);
    const unblockGenerateScene = useStore((state) => state.unblockGenerateScene);
    const generateScene = useStore((state) => state.generateScene);
    const files = useStore((state) => state.files);
    const results = useStore((state) => state.results);
    const selectedMesh = useStore((state) => state.selectedMesh);

    const { transformMode, environment } = useControlParams();
    
    const performanceSettings = {
        current: 1,
        min: 0.1,
        max: 1,
        debounce: 200,
    };

    // generate scene whenever file array is changed
    useEffect(() => {
        if (files.length === 0) return;

        if (blockGenerateScene) {
            unblockGenerateScene();
            return;
        }

        startTransition(() => {
            generateScene();
        });
    }, [files, generateScene]);

    return (
        <Canvas
            gl={{ preserveDrawingBuffer: true }}
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 5, -10], fov: 50 }}
            performance={performanceSettings}
        >
            <Perf position="bottom-left" />

            <OrbitGizmo />

            {/* <Environment background files={schadowplatz_1k} /> */}
            <Environment background preset={environment} />
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[10, 10, 10]}
                intensity={1}
                castShadow
                shadow-normalBias={0.06}
            />

            <OrbitControls makeDefault name="OrbitControls" />

            <Suspense fallback={null}>
                <Selection>
                    <EffectComposer multisampling={8} autoClear={false}>
                        <Outline
                            blur
                            visibleEdgeColor="orange"
                            edgeStrength={100}
                            width={1000}
                        />
                    </EffectComposer>
                    {results.length > 0 &&
                        results.map(({ gltf, name }) => (
                            <Model key={name} gltf={gltf} name={name} />
                        ))}
                    {selectedMesh?.mesh && (
                        <TransformControls
                            object={selectedMesh?.mesh || null}
                            enabled={selectedMesh?.mesh ? true : false}
                            mode={transformMode}
                        />
                    )}
                </Selection>

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
            <AdaptiveDpr pixelated />
        </Canvas>
    );
};

export default memo(Viewer);
