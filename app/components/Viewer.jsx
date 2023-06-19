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
import { memo, startTransition, Suspense, useEffect } from "react";
import { Perf } from "r3f-perf";
import {
    Selection,
    EffectComposer,
    Outline,
} from "@react-three/postprocessing";

import ControlParams from "./Controls/ControlParams.jsx";
import useStore from "../utils/store.js";
import Model from "./Model.jsx";
// import { schadowplatz_1k } from "../assets/images";

const Viewer = () => {
    const generateScene = useStore((state) => state.generateScene);
    const files = useStore((state) => state.files);
    const results = useStore((state) => state.results);
    const selectedMesh = useStore((state) => state.selectedMesh);
    const setTransforms = useStore((state) => state.setTransforms);

    const { transformMode, environment } = ControlParams();

    // generate scene whenever file array is changed
    useEffect(() => {
        startTransition(() => {
            generateScene();
        });
    }, [files, generateScene]);

    const handleTransform = () => {
        const mesh = selectedMesh?.current;
        if (mesh) {
            startTransition(() => {
                setTransforms({
                    position: mesh.position,
                    rotation: mesh.rotation,
                    scale: mesh.scale,
                });
            });
        }
    };

    return (
        <Canvas
            gl={{ preserveDrawingBuffer: true }}
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 5, -10], fov: 50 }}
        >
            <Perf position="bottom-right" />
            <Environment background preset={environment} />
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[10, 10, 10]}
                intensity={1}
                castShadow
                shadow-normalBias={0.06}
            />

            <OrbitControls makeDefault />

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
                    {selectedMesh && (
                        <TransformControls
                            object={selectedMesh || null}
                            enabled={selectedMesh ? true : false}
                            mode={transformMode}
                            onObjectChange={handleTransform}
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
