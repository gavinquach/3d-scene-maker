"use client";

import {
    AdaptiveDpr,
    // BakeShadows,
    // ContactShadows,
    // Environment,
    OrbitControls,
    Preload,
    TransformControls,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { memo, startTransition, Suspense, useEffect } from "react";
import { Perf } from "r3f-perf";
import {
    Selection,
    EffectComposer,
    Outline,
} from "@react-three/postprocessing";

import useControlParams from "./Controls/ControlParams.jsx";
import useStore from "../utils/store.js";
import Light from "./Light.jsx";
import Model from "./Model.jsx";
import OrbitGizmo from "./OrbitGizmo/OrbitGizmo.jsx";
// import { schadowplatz_1k } from "../assets/images";

import globalObject from "../utils/globalObjects.ts";

const CheckScene = () => {
    const objectTransforms = useStore((state) => state.objectTransforms);
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);
    const controls = useThree((state) => state.controls);
    const gl = useThree((state) => state.gl);

    useEffect(() => {
        // scene.traverse((child) => {
        //     console.log("child", child);
        // });
        // console.log("End of child objects");
        // console.log("================================================================");

        globalObject.scene = scene;
        globalObject.camera = camera;
        globalObject.controls = controls;
        globalObject.renderer = gl;
        return () => {
            globalObject.scene = null;
            globalObject.camera = null;
            globalObject.controls = null;
            globalObject.renderer = null;
        };
    }, [camera, controls, gl, scene]);

    useEffect(() => {
        if (globalObject.isNotImport) {
            return;
        }

        scene.children.forEach((child) => {
            if (child.type !== "Mesh") return;

            Object.keys(objectTransforms).forEach((obj) => {
                const objTransforms = objectTransforms[obj];
                if (obj === child.name) {
                    child.position.set(
                        objTransforms.position.x,
                        objTransforms.position.y,
                        objTransforms.position.z
                    );
                    child.rotation.set(
                        objTransforms.rotation.x,
                        objTransforms.rotation.y,
                        objTransforms.rotation.z
                    );
                    child.scale.set(
                        objTransforms.scale.x,
                        objTransforms.scale.y,
                        objTransforms.scale.z
                    );
                    return;
                }
            });
        });
        globalObject.isNotImport = true;
    }, [objectTransforms]);
};

const Viewer = () => {
    const loadGLTF = useStore((state) => state.loadGLTF);
    const files = useStore((state) => state.files);
    const results = useStore((state) => state.results);
    const lights = useStore((state) => state.lights);
    const selectedObject = useStore((state) => state.selectedObject);

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
            camera={{ position: [6, 5, -10], fov: 50, near: 0.001, far: 1000 }}
            performance={performanceSettings}
        >
            <color attach="background" args={["#3B3B3B"]} />

            <CheckScene />
            <Perf position="bottom-left" />

            <OrbitGizmo />
            <gridHelper args={[1000, 1000, 0x000000, 0x808080]} />

            {/* <Environment background files={schadowplatz_1k} /> */}
            {/* <Environment background preset={environment} /> */}
            <ambientLight intensity={0.3} />

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
                    {Object.keys(lights).length > 0 &&
                        Object.keys(lights).map((key) => {
                            const { name, type, properties } = lights[key];
                            return (
                                <Light
                                    key={name}
                                    name={name}
                                    type={type}
                                    properties={properties}
                                />
                            );
                        })}
                    {Object.keys(results).length > 0 &&
                        Object.keys(results).map((name, i) => (
                            <Model
                                key={name}
                                name={name}
                                gltf={results[Object.keys(results)[i]].gltf}
                            />
                        ))}
                    {selectedObject?.object && (
                        <TransformControls
                            object={selectedObject?.object || null}
                            enabled={selectedObject?.object ? true : false}
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
            <Preload all />
            <AdaptiveDpr pixelated />
        </Canvas>
    );
};

export default memo(Viewer);
