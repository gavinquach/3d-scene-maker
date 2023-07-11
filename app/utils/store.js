import { create } from "zustand";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader, MeshoptDecoder } from "three-stdlib";

import globalObject from "./globalObjects.ts";
import { DRACO_LOADER, GLTF_LOADER, KTX2_LOADER } from "./constants.ts";

const useStore = create((set, get) => ({
    files: {},
    results: {},
    sceneCollection: {},
    selectedObject: { name: null, object: null, objRef: null },
    sameFiles: false,
    transformMode: "translate",
    section: 0,
    environment: null,
    environmentBackground: true,

    loadGLTF: async (sceneCollectionObject = null) => {
        const { files, results } = get();

        if (Object.keys(files).length === 0) return;

        // Preload models to avoid loading delay
        for (const [_, buffer] of Object.entries(files)) {
            useLoader.preload(GLTFLoader, buffer, (loader) => {
                loader.setDRACOLoader(DRACO_LOADER);
                loader.setKTX2Loader(KTX2_LOADER.detectSupport(globalObject.renderer));
                loader.setMeshoptDecoder(MeshoptDecoder);
            });
        }

        const gltfLoader = GLTF_LOADER(globalObject.renderer);

        const gltfs = await Promise.all(
            Object.keys(files).map((filename) => {
                return new Promise((resolve, reject) =>
                    gltfLoader.parse(
                        files[filename],
                        "",
                        (gltf) => {
                            gltf.name = filename; // Assign the name property
                            resolve(gltf);
                        },
                        reject
                    )
                );
            })
        );

        // user opens a file, no need to add to sceneCollection
        if (sceneCollectionObject !== null) {
            const gltfObjects = gltfs.reduce((acc, gltf) => {
                acc[gltf.name] = gltf;
                return acc;
            }, {});
            set({ sceneCollection: sceneCollectionObject, results: gltfObjects });
        } else {
            // Create objects with gltf objects, using file names as keys
            const gltfResults = {};
            const gltfObjects = gltfs.reduce((acc, gltf) => {
                acc[gltf.name] = {
                    category: "gltf",
                    name: gltf.name,
                    transforms: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 },
                    },
                    properties: {
                        castShadow: false,
                    },
                };

                gltfResults[gltf.name] = gltf;

                return acc;
            }, {});

            // Create a set of existing keys from sceneCollection
            const existingNames = new Set(Object.keys(results));

            // Filter out duplicate keys from gltfObjects
            const filteredGltfObjects = {};
            for (const key in gltfObjects) {
                if (!existingNames.has(key)) {
                    filteredGltfObjects[key] = gltfObjects[key];
                }
            }

            set((state) => ({
                sceneCollection: { ...state.sceneCollection, ...filteredGltfObjects },
                results: { ...state.results, ...gltfResults },
            }));
        }
    },
    addFileToStore: (newBuffer, name) => {
        set((state) => ({
            files: {
                ...state.files,
                [name]: { buffer: newBuffer },
            },
        }));
    },
    addFiles: (object) => {
        set({ files: object });
    },
    addLight: (name, lightObject) => {
        set((state) => ({
            sceneCollection: {
                ...state.sceneCollection,
                [name]: lightObject,
            },
        }));
    },
    deleteObject: (objectName) => {
        if (objectName === null) return;
        set((state) => ({
            selectedObject: { name: null, object: null, objRef: null },
            files: Object.fromEntries(
                Object.entries(state.files).filter(([key]) => key !== objectName)
            ),
            results: Object.fromEntries(
                Object.entries(state.results).filter(([key]) => key !== objectName)
            ),
            sceneCollection: Object.fromEntries(
                Object.entries(state.sceneCollection).filter(
                    ([key]) => key !== objectName
                )
            ),
        }));
    },
    clearAll: () => {
        set({
            selectedObject: { name: null, object: null, objRef: null },
            files: {},
            results: {},
            sceneCollection: {},
            sameFiles: false,
        });
    },
    setSelectedObject: (objectName, objectRef = null) => {
        if (objectName === null) {
            set({ selectedObject: { name: null, object: null, objRef: null } });
            return;
        }

        if (objectRef !== null) {
            // Get the object from scene collection
            const { sceneCollection } = get();
            const item = sceneCollection[objectName];
            set({
                selectedObject: { name: objectName, object: item, objRef: objectRef },
            });
            return;
        }

        // Get the object from scene collection
        const { sceneCollection } = get();
        const item = sceneCollection[objectName];
        const sceneObj = globalObject.scene.getObjectByName(objectName);
        if (!item || !sceneObj) {
            console.error("Object not found in scene collection");
            set({ selectedObject: { name: null, object: null, objRef: null } });
            return;
        }

        set({
            selectedObject: {
                name: objectName,
                object: sceneCollection[objectName],
                objRef: globalObject.scene.getObjectByName(objectName),
            },
        });
    },
    setTransforms: (name, transforms) => {
        const { sceneCollection } = get();
        sceneCollection[name].transforms = transforms;
        set({ sceneCollection: sceneCollection });
    },
    setTransformMode: (mode) => {
        set({ transformMode: mode });
    },
    setSameFiles: (bool) => {
        set({ sameFiles: bool });
    },
    setSection: (section) => {
        set({ section: section });
    },
    setEnvironment: (env) => {
        set({ environment: env === "" ? null : env });
    },
    toggleEnvironmentBackground: () => {
        set((state) => ({ environmentBackground: !state.environmentBackground }));
    },
}));

export default useStore;
