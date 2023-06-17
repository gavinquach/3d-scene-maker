"use client";

import {
    BakeShadows,
    ContactShadows,
    Environment,
    OrbitControls,
    Stage,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { memo, startTransition, Suspense, useEffect, useRef } from "react";
import { Perf } from "r3f-perf";

import useStore from "./store.js";
import Model from "./Model";
// import { schadowplatz_1k } from "../assets/images";

const Scene = () => {
    const ref = useRef();
    const { generateScene, results, fileNames } = useStore();

    console.log(results);

    useEffect(() => {
        startTransition(() => {
            generateScene();
        });
    }, []);

    return (
        <div className="h-full w-screen">
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [5, 5, 5], fov: 50 }}
            >
                <Perf position="top-left" />
                <Suspense fallback={null}>
                    <ambientLight intensity={0.3} />
                    <Environment background preset="city" />

                    <OrbitControls makeDefault ref={ref} />

                    {results.length > 0 &&
                        results.map((result, i) => <Model result={result} name={fileNames[i]} />)}

                    <ContactShadows
                        frames={1}
                        position={[0, -0.2, 0]}
                        opacity={0.75}
                        scale={15}
                        blur={2}
                        far={6}
                    />
                    {/* <BakeShadows /> */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default memo(Scene);
