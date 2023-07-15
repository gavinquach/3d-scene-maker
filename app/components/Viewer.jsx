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
import { Canvas, useThree } from "@react-three/fiber";
import { startTransition, Suspense, useEffect, useLayoutEffect } from "react";
import { Perf } from "r3f-perf";
import {
    Selection,
    EffectComposer,
    Outline,
} from "@react-three/postprocessing";

// import useControlParams from "./Controls/ControlParams.jsx";
import useStore from "../utils/store.js";
import OrbitGizmo from "./OrbitGizmo/OrbitGizmo.jsx";
import globalObject from "../utils/globalObject.ts";
import { PERFORMANCE_SETTINGS } from "../utils/constants.ts";

const Light = dynamic(() => import("./Light.jsx").then((mod) => mod.Light));
const Model = dynamic(() => import("./Model.jsx").then((mod) => mod.Model));

const CheckScene = () => {
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);
    const controls = useThree((state) => state.controls);
    const gl = useThree((state) => state.gl);

    const setSelectedObject = useStore((state) => state.setSelectedObject);

    useLayoutEffect(() => {
        // scene.traverse((child) => {
        //     console.log("child", child);
        // });
        // console.log("End of child objects");
        // console.log("================================================================");

        globalObject.scene = scene;
        globalObject.camera = camera;
        globalObject.controls = controls;
        globalObject.renderer = gl;

        // set Threejs Scene as default object
        startTransition(() => {
            setSelectedObject({ objectRef: scene, name: scene.name });
        });
        return () => {
            globalObject.scene = null;
            globalObject.camera = null;
            globalObject.controls = null;
            globalObject.renderer = null;
        };
    }, [camera, controls, gl, scene]);
};

export const Viewer = () => {
    const loadGLTF = useStore((state) => state.loadGLTF);
    const files = useStore((state) => state.files);
    const results = useStore((state) => state.results);
    const selectedObject = useStore((state) => state.selectedObject);
    const transformMode = useStore((state) => state.transformMode);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const environment = useStore((state) => state.environment);
    const environmentBackground = useStore(
        (state) => state.environmentBackground
    );

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
            performance={PERFORMANCE_SETTINGS}
        >
            <color attach="background" args={["#3B3B3B"]} />

            <CheckScene />
            <Perf position="bottom-left" />

            <OrbitGizmo />
            <gridHelper args={[1000, 1000, 0x000000, 0x808080]} />

            {environment && <Environment
                background={environmentBackground === true}
                files={environment}
            />}
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

                    {Object.keys(sceneCollection).length > 0 &&
                        Object.keys(sceneCollection).map((name) => {
                            const { attributes, properties } = sceneCollection[name];
                            if (sceneCollection[name].category === "light") {
                                return (
                                    <Light
                                        key={name}
                                        name={name}
                                        attributes={attributes}
                                        properties={properties}
                                    />
                                );
                            }
                        })}

                    {Object.keys(results).length > 0 &&
                        Object.keys(results).map((name) => {
                            return (
                                <Model
                                    key={name}
                                    name={name}
                                    gltf={results[name]}
                                    properties={sceneCollection[name].properties}
                                />
                            );
                        })}
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
