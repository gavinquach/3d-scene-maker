import { create } from "zustand";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// import globalObject from "./globalObjects.ts";
import { DRACO_LOADER, KTX2_LOADER } from "./constants.ts";

const useStore = create((set, get) => ({
    files: [],
    sceneCollection: {},
    results: {},
    lights: {},
    selectedObject: { object: null, name: null, properties: null },
    objectTransforms: {},
    sameFiles: false,
    transformMode: "translate",

    loadGLTF: async () => {
        const { files, results } = get();

        // Preload models to avoid loading delay
        for (const file of files) {
            useLoader.preload(GLTFLoader, file.buffer, (loader) => {
                loader.setDRACOLoader(DRACO_LOADER);
                loader.setKTX2Loader(
                    KTX2_LOADER /*.detectSupport(globalObject.renderer)*/
                );
                loader.setMeshoptDecoder(MeshoptDecoder);
            });
        }

        let gltfLoader;
        if (typeof window !== "undefined") {
            gltfLoader = new GLTFLoader()
                .setCrossOrigin("anonymous")
                .setDRACOLoader(DRACO_LOADER)
                .setKTX2Loader(KTX2_LOADER /*.detectSupport(globalObject.renderer)*/)
                .setMeshoptDecoder(MeshoptDecoder);
        }

        const gltfs = await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) =>
                    gltfLoader.parse(
                        file.buffer,
                        "",
                        (gltf) => {
                            gltf.name = file.name; // Assign the name property
                            resolve(gltf);
                        },
                        reject
                    )
                );
            })
        );

        // generate scene for the first time
        if (Object.keys(results).length === 0) {
            // Create an object with gltf objects, using file names as keys
            const gltfObjects = gltfs.reduce((acc, gltf, index) => {
                acc[files[index].name] = {
                    category: "gltf",
                    gltf: gltf,
                    buffer: files[index].buffer,
                    name: files[index].name,
                };
                return acc;
            }, {});

            set((state) => ({
                results: { ...state.results, ...gltfObjects },
                sceneCollection: { ...state.sceneCollection, ...gltfObjects },
            }));
        }
        // when user adds object(s) to the scene
        else {
            // Create an object with gltf objects, using file names as keys
            const gltfObjects = gltfs.reduce((acc, gltf, index) => {
                acc[files[index].name] = {
                    category: "gltf",
                    gltf: gltf,
                    buffer: files[index].buffer,
                    name: files[index].name,
                };
                return acc;
            }, {});

            // Create a set of existing keys from results
            const existingKeys = new Set(Object.keys(results));

            // Filter out duplicate keys from gltfObjects
            const filteredGltfObjects = {};
            for (const key in gltfObjects) {
                if (!existingKeys.has(key)) {
                    filteredGltfObjects[key] = gltfObjects[key];
                }
            }

            set((state) => ({
                results: { ...state.results, ...filteredGltfObjects },
                sceneCollection: { ...state.sceneCollection, ...filteredGltfObjects },
            }));
        }
    },
    addFileToStore: (newBuffer, name) => {
        set((state) => ({
            files: [...state.files, { buffer: newBuffer, name: name }],
        }));
    },
    addMultipleFilesToStore: (newBuffers, newNames) => {
        set((state) => ({
            files: [
                ...state.files,
                ...newBuffers.map((newBuffer, index) => ({
                    buffer: newBuffer,
                    name: newNames[index],
                })),
            ],
        }));
    },
    addLight: (name, lightObject) => {
        set((state) => ({
            lights: {
                ...state.lights,
                [name]: { category: "light", ...lightObject },
            },
            sceneCollection: {
                ...state.sceneCollection,
                [name]: { category: "light", ...lightObject },
            },
        }));
    },
    deleteObject: (objectName) => {
        if (objectName === null) return;
        set((state) => ({
            selectedObject: { object: null, name: null, properties: null },
            files: state.files.filter(({ name }) => name !== objectName),
            lights: Object.fromEntries(
                Object.entries(state.lights).filter(([key]) => key !== objectName)
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
    deleteFromTransforms: (name) => {
        set((state) => {
            const { [name]: _, ...updatedTransforms } = state.objectTransforms;
            return {
                objectTransforms: updatedTransforms,
            };
        });
    },
    clearAll: () => {
        set({
            selectedObject: { object: null, name: null, properties: null },
            files: [],
            results: {},
            sceneCollection: {},
            lights: {},
            objectTransforms: {},
            sameFiles: false,
        });
    },
    setSelectedObject: (object, objectName) => {
        if (object === null && objectName !== null) {
            // Get the object from scene collection
            const { sceneCollection } = get();
            const item = sceneCollection[objectName];
            if (!item) return;

            if (item.category === "light") {
                set({ selectedObject: { object: item, name: objectName } });
            } else if (item.category === "gltf") {
                set({ selectedObject: { object: item.gltf.scene, name: objectName } });
            }
        } else {
            set({ selectedObject: { object: object, name: objectName } });
        }
    },
    setTransformsObject: (object) => {
        set({ objectTransforms: object });
    },
    setTransforms: (name, transforms) => {
        set((state) => ({
            objectTransforms: {
                ...state.objectTransforms,
                [name]: transforms,
            },
        }));
    },
    setTransformMode: (mode) => {
        set({ transformMode: mode });
    },
    setSameFiles: (bool) => {
        set({ sameFiles: bool });
    },
}));

export default useStore;
