import { create } from "zustand";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader, MeshoptDecoder } from "three-stdlib";
import {
    DRACO_LOADER,
    ENVMAP_PATH,
    GLTF_LOADER,
    KTX2_LOADER,
} from "./constants.ts";
import globalObject from "./globalObject.ts";

const useStore = create((set, get) => ({
    files: {},
    results: {},
    sceneCollection: {},
    selectedObject: { name: "", object: null, objRef: null },
    sameFiles: false,
    transformMode: "translate",
    scene: {
        transforms: {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        },
        properties: {
            environment: `${ENVMAP_PATH}/potsdamer_platz_1k.hdr`,
            environmentBackground: true,
            environmentIntensity: 0.5,
            castShadow: false,
            receiveShadow: false,
            visible: true,
            frustumCulled: true,
            renderOrder: 0,
        },
    },

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

        // user opens a saved scene file, load the objects from the file
        if (sceneCollectionObject !== null) {
            const gltfObjects = gltfs.reduce((acc, gltf) => {
                acc[gltf.name] = gltf;
                return acc;
            }, {});
            set({ sceneCollection: sceneCollectionObject, results: gltfObjects });
            return;
        }

        // Create objects with gltf objects, using file names as keys
        const gltfResults = {};
        const gltfObjects = gltfs.reduce((acc, gltf) => {
            acc[gltf.name] = {
                category: "gltf",
                name: gltf.name,
                type: "Mesh",
                transforms: {
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                },
                properties: {
                    castShadow: false,
                    receiveShadow: false,
                    visible: true,
                    frustumCulled: true,
                    renderOrder: 0,
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
    },
    addFiles: (newFiles) => {
        set((state) => ({
            files: {
                ...state.files,
                ...newFiles,
            },
        }));
    },
    addLight: (name, lightObject) => {
        set((state) => ({
            sceneCollection: {
                ...state.sceneCollection,
                [name]: lightObject,
            },
        }));
    },
    updateObjectProperty: (name, property, value) => {
        const { sceneCollection } = get();
        sceneCollection[name].properties[property] = value;
        set({ sceneCollection: sceneCollection });
    },
    updateObjectTransform: (name, mode, value) => {
        const { sceneCollection } = get();
        sceneCollection[name].transforms[mode] = value;
        set({ sceneCollection: sceneCollection });
    },
    updateSceneProperty: (propertyName, value) => {
        set((state) => ({
            scene: {
                ...state.scene,
                properties: {
                    ...state.scene.properties,
                    [propertyName]: value,
                },
            },
        }));
    },
    updateSceneTransform: (mode, value) => {
        set((state) => ({
            scene: {
                ...state.scene,
                transforms: {
                    ...state.scene.transforms,
                    [mode]: value,
                },
            },
        }));
    },
    updateTransforms: (
        { name, objRef },
        transformValue = 0,
        transformMode = "position",
        transformAxis = "x"
    ) => {
        if (name === null && objRef === null) return;

        const { sceneCollection } = get();

        if (name) {
            sceneCollection[name].transforms = transformValue;
        } else if (objRef) {
            const transformType = {
                position: "position",
                rotation: "rotation",
                scale: "scale",
            }[transformMode];
            if (transformType) objRef[transformType][transformAxis] = transformValue;
        }

        set({ sceneCollection });
    },
    setSelectedObject: (objectObject) => {
        const { objectName, objectRef } = objectObject;
        if (objectName === null && objectRef === null) return;

        // set Scene as selected object if objectName is null
        if (objectName === null) {
            set({
                selectedObject: { name: "", object: null, objRef: globalObject.scene },
            });
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
            set({
                selectedObject: { name: "", object: null, objRef: globalObject.scene },
            });
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
    setTransformMode: (mode) => {
        set({ transformMode: mode });
    },
    setSameFiles: (bool) => {
        set({ sameFiles: bool });
    },
    setEnvironment: (env) => {
        set({ environment: env === "" ? null : env });
    },
    setEnvironmentIntensity: (num) => {
        set({ environmentIntensity: num ? num : 0.5 });
    },
    setSceneData: (sceneData) => {
        set({ scene: sceneData });
    },
    setLightHelper: (name, helper) => {
        set((state) => ({
            sceneCollection: {
                ...state.sceneCollection,
                [name]: {
                    ...state.sceneCollection[name],
                    helper: helper,
                },
            },
        }));
    },
    deleteObject: (objectName) => {
        if (objectName === null) return;
        set((state) => ({
            selectedObject: { name: "", object: null, objRef: globalObject.scene },
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
            files: {},
            results: {},
            sceneCollection: {},
            sameFiles: false,
            transformMode: "translate",
            selectedObject: { name: "", object: null, objRef: globalObject.scene },
            scene: {
                camera: {
                    fov: 50,
                    near: 0.01,
                    far: 500,
                    position: { x: 6, y: 5, z: -10 },
                    rotation: { x: 0, y: 0, z: 0 },
                    target: { x: 0, y: 0, z: 0 },
                },
                transforms: {
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                },
                properties: {
                    environment: `${ENVMAP_PATH}/potsdamer_platz_1k.hdr`,
                    environmentBackground: true,
                    environmentIntensity: 0.5,
                    castShadow: false,
                    receiveShadow: false,
                    visible: true,
                    frustumCulled: true,
                    renderOrder: 0,
                },
            },
        });
    },
}));

export default useStore;
