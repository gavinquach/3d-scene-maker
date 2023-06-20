import { create } from "zustand";

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
    selectedMesh: null,
    selectedMeshTransforms: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
    },
    sameFiles: false,
    blockGenerateScene: false,
    sceneData: {
        invisible: [],
        objects: [],
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

    getBufferFromScene: (scene) => {
        const { results } = get();
        const result = results.find(({ gltf }) => gltf.scene === scene);
        return result ? result.buffer : null;
    },

    deleteFromStore: (obj) => {
        if (obj === null) return;
        const objBuffer = get().getBufferFromScene(obj);
        set((state) => ({
            files: state.files.filter(({ buffer }) => buffer !== objBuffer),
            results: state.results.filter(({ gltf }) => gltf.scene.name !== obj.name),
            selectedMesh: null,
            blockGenerateScene: true,
        }));
    },

    clearAll: () => {
        set({ files: [], results: [] });
    },

    setSelectedMesh: (mesh) => {
        set({
            selectedMesh: mesh,
            selectedMeshTransforms: {
                position: {
                    x: mesh?.current?.position.x,
                    y: mesh?.current?.position.y,
                    z: mesh?.current?.position.z,
                },
                rotation: {
                    x: mesh?.current?.rotation.x,
                    y: mesh?.current?.rotation.y,
                    z: mesh?.current?.rotation.z,
                },
                scale: {
                    x: mesh?.current?.scale.x,
                    y: mesh?.current?.scale.y,
                    z: mesh?.current?.scale.z,
                },
            },
        });
    },

    setTransforms: ({ position, rotation, scale }) => {
        set({
            selectedMeshTransforms: {
                position: {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                },
                rotation: {
                    x: rotation.x,
                    y: rotation.y,
                    z: rotation.z,
                },
                scale: {
                    x: scale.x,
                    y: scale.y,
                    z: scale.z,
                },
            },
        });
    },

    addToScene: () => { },

    generateScene: async () => {
        const { blockGenerateScene } = get();
        if (blockGenerateScene) {
            set({ blockGenerateScene: false });
            return;
        }

        const { files, results } = get();

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

        if (results.length === 0) {
            set({
                results: gltfs.map((gltf, index) => ({
                    gltf: gltf,
                    buffer: files[index].buffer,
                    name: files[index].name,
                })),
            });
        } else {
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

    setBlockGenerateScene: (bool) => {
        set({ blockGenerateScene: bool });
    },
}));

export default useStore;
