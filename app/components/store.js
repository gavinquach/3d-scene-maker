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
    buffers: [],
    fileNames: [],
    results: [],
    selectedMesh: null,

    addFileToStore: (newBuffer, name) => {
        set((state) => ({
            buffers: [...state.buffers, newBuffer],
            fileNames: [...state.fileNames, name],
        }));
    },

    addMultipleFilesToStore: (newBuffers, names) => {
        set((state) => ({
            buffers: [...state.buffers, ...newBuffers],
            fileNames: [...state.fileNames, ...names],
        }));
    },

    clearFiles: () => {
        set({ buffers: [], fileNames: [], results: [] });
    },

    setSelectedMesh: (mesh) => {
        set({ selectedMesh: mesh });
    },

    generateScene: async () => {
        const { buffers } = get();
        const promiseResults = await Promise.all(
            buffers.map((buffer) => {
                return new Promise((resolve, reject) =>
                    gltfLoader.parse(buffer, "", resolve, reject)
                );
            })
        );

        set({ results: promiseResults });
    },
}));

export default useStore;
