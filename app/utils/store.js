import { create } from "zustand";

import { useLoader } from "@react-three/fiber";

import { REVISION, WebGLRenderer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
const dracoloader = new DRACOLoader().setDecoderPath(
    `${THREE_PATH}/examples/jsm/libs/draco/gltf/`
);
const ktx2Loader = new KTX2Loader().setTranscoderPath(
    `${THREE_PATH}/examples/jsm/libs/basis/`
);

let gltfLoader;
if (typeof window !== "undefined") {
    const renderer = new WebGLRenderer();
    gltfLoader = new GLTFLoader()
        .setCrossOrigin("anonymous")
        .setDRACOLoader(dracoloader)
        .setKTX2Loader(ktx2Loader.detectSupport(renderer))
        .setMeshoptDecoder(MeshoptDecoder);
}

const useStore = create((set, get) => ({
    files: [],
    results: [],
    lights: [],
    selectedMesh: { mesh: null, name: null },
    meshTransforms: {},
    sameFiles: false,

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

    deleteFromStore: (meshName) => {
        if (meshName === null) return;
        set((state) => ({
            files: state.files.filter(({ name }) => name !== meshName),
            results: state.results.filter(({ name }) => name !== meshName),
            selectedMesh: { mesh: null, name: null },
        }));
    },

    clearAll: () => {
        set({
            files: [],
            results: [],
            selectedMesh: { mesh: null, name: null },
            meshTransforms: {},
            sameFiles: false,
        });
    },

    setSelectedMesh: (mesh, meshName) => {
        if (mesh === null && meshName !== null) {
            // get the mesh from the results
            const { results } = get();
            const result = results.find(({ name }) => name === meshName);
            if (result) {
                set({ selectedMesh: { mesh: result.gltf.scene, name: meshName } });
            }
            return;
        }
        set({ selectedMesh: { mesh: mesh, name: meshName } });
    },

    setHashMapValue: (key, value) => {
        set((state) => ({
            hashmap: {
                ...state.hashmap,
                [key]: value,
            },
        }));
    },

    setMeshTransformsObject: (object) => {
        set({ meshTransforms: object });
    },
    setTransforms: (name, transforms) => {
        set((state) => ({
            meshTransforms: {
                ...state.meshTransforms,
                [name]: transforms,
            }
        }));
    },
    deleteFromTransforms: (name) => {
        set((state) => {
            const { [name]: _, ...updatedTransforms } = state.meshTransforms;
            return {
                meshTransforms: updatedTransforms,
            };
        });
    },

    addLight: (name, lightObject) => {
        set((state) => ({
            lights: {
                ...state.lights, 
                [name]: lightObject,
            },
        }));
    },

    generateScene: async () => {
        const { files, results } = get();

        // Preload models to avoid loading delay
        for (let i = 0; i < files.length; i++) {
            const buffer = files[i].buffer;
            useLoader.preload(GLTFLoader, buffer);
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
        if (results.length === 0) {
            set({
                results: gltfs.map((gltf, index) => ({
                    gltf: gltf,
                    buffer: files[index].buffer,
                    name: files[index].name,
                })),
            });
        }
        // when user adds object(s) to the scene
        else {
            // Create a set of gltf names for O(1) lookup
            const gltfNamesSet = new Set(results.map((result) => result.name));

            // Remove matching objects from gltfs list
            const remainingGltfs = gltfs
                .filter(({ name }) => !gltfNamesSet.has(name))
                .map((gltf, index) => ({
                    gltf: gltf,
                    buffer: files[index].buffer,
                    name: gltf.name,
                }));

            set({ results: [...results, ...remainingGltfs] });
        }
    },

    setSameFiles: (bool) => {
        set({ sameFiles: bool });
    },
}));

export default useStore;
