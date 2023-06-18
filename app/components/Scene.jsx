"use client";

import {
    BakeShadows,
    ContactShadows,
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

import useStore from "./store.js";
import Model from "./Model";
// import { schadowplatz_1k } from "../assets/images";

const Scene = () => {
    const generateScene = useStore((state) => state.generateScene);
    const results = useStore((state) => state.results);
    const fileNames = useStore((state) => state.fileNames);
    const selectedMesh = useStore((state) => state.selectedMesh);

    useEffect(() => {
        startTransition(() => {
            generateScene();
        });
    }, [generateScene]);

    return (
        <div className="h-full w-screen">
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [-5, 5, -5], fov: 50 }}
            >
                <Perf position="top-left" />
                <ambientLight intensity={0.3} />
                <Environment background preset="city" />

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
                            results.map((result, i) => (
                                <Model key={fileNames[i]} result={result} name={fileNames[i]} />
                            ))}
                        {selectedMesh && (
                            <TransformControls
                                object={selectedMesh}
                                enabled={selectedMesh}
                                mode={"translate"}
                            />
                        )}
                    </Selection>

                    <ContactShadows
                        frames={1}
                        position={[0, -0.1, 0]}
                        opacity={0.75}
                        scale={15}
                        blur={2}
                        far={6}
                    />
                    <BakeShadows />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default memo(Scene);
