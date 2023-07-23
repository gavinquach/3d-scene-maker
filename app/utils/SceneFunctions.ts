import { startTransition, useCallback, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Object3D } from "three";

import useStore from "./store";
import globalObject from "./globalObject";
import { EXPORT_FILE_NAME, SCENE_DATA_FILE_NAME } from "./constants";
import { generateRandomString } from "./functions";

export const SceneFunctions = () => {
    const addFiles = useStore((state) => state.addFiles);
    const addLight = useStore((state) => state.addLight);
    const clearAll = useStore((state) => state.clearAll);
    const deleteObject = useStore((state) => state.deleteObject);
    const files = useStore((state) => state.files);
    const loadGLTF = useStore((state) => state.loadGLTF);
    const scene = useStore((state) => state.scene);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const selectedObject = useStore((state) => state.selectedObject);
    const setSameFiles = useStore((state) => state.setSameFiles);
    const setScene = useStore((state) => state.setScene);

    const readSceneData: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => Promise<void> = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file: File | undefined = event.target.files?.[0];

            // Reset the input field to allow uploading the same file again
            event.target.value = generateRandomString(Math.random() * 10);

            if (!file) return;

            const binFilesMap: Record<string, ArrayBuffer> = {};
            let parsedData: any = {};
            try {
                const zip = new JSZip();
                const zipData = await zip.loadAsync(file);

                // Create a mapping of file names to ArrayBuffer data
                for (const entryName in zipData.files) {
                    const entry = zipData.files[entryName];

                    if (entry.name.endsWith(".bin")) {
                        const binData = await entry.async("arraybuffer");
                        binFilesMap[entry.name.replace(".bin", "")] = binData;
                    }
                }

                // Process .json file
                const jsonFile = zipData.files[SCENE_DATA_FILE_NAME];
                if (jsonFile) {
                    const jsonData = await jsonFile.async("text");
                    parsedData = JSON.parse(jsonData);
                } else {
                    throw new Error("No scene data file found in the zip archive.");
                }
            } catch (error) {
                console.error("Error handling file:", error);
            }

            globalObject.canGenerate = false;
            startTransition(() => {
                clearAll();
                addFiles(binFilesMap);
                setScene(parsedData.scene);
                loadGLTF(parsedData.collection);
            });
        },
        [addFiles, clearAll, loadGLTF, setScene]
    );

    const exportSceneData: () => Promise<void> = useCallback(async () => {
        const zip = new JSZip();

        // Add the JSON data to the zip file
        const sceneData = { scene: scene, collection: sceneCollection };
        const jsonData = JSON.stringify(sceneData, null, 2);
        zip.file(SCENE_DATA_FILE_NAME, jsonData, { compression: "DEFLATE" });

        // Iterate over each ArrayBuffer and create a blob from it
        for (const [filename, buffer] of Object.entries(files)) {
            // Add the blob as a .bin file to the zip
            const blob = new Blob([buffer as BlobPart]);
            zip.file(`${filename}.bin`, blob, { compression: "DEFLATE" });
        }
        
        console.log(files);
        console.log(sceneData);

        // Generate the zip file
        const zipContent = await zip.generateAsync({ type: "blob" });

        // Save the file
        saveAs(zipContent, `${EXPORT_FILE_NAME}.zip`);
    }, [scene, files, sceneCollection]);

    const onDrop: (acceptedFiles: File[]) => Promise<void> = useCallback(
        async (acceptedFiles: File[]) => {
            const readerResults: ArrayBuffer[] = await Promise.all(
                acceptedFiles.map((file: File) => {
                    return new Promise<ArrayBuffer>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const arrayBuffer = reader.result as ArrayBuffer;
                            resolve(arrayBuffer);
                        };
                        reader.onerror = () => reject(reader);
                        reader.readAsArrayBuffer(file);
                    });
                })
            );

            const filenames = acceptedFiles.map(({ name }) =>
                name.replace(/ /g, "_").replace(/\.glb|gltf/g, "")
            );

            // Build the filenameIndices hash map
            const filenameIndices: Record<string, number> = {};
            for (let i = 0; i < filenames.length; i++) {
                filenameIndices[filenames[i]] = i;
            }

            // remove duplicates
            for (const fileName of Object.keys(sceneCollection)) {
                const index: number | undefined = filenameIndices[fileName];
                if (index !== undefined) {
                    filenames.splice(index, 1);
                    readerResults.splice(index, 1);
                }
            }

            // if no files are found after duplicate removal, update UI
            if (filenames.length === 0) {
                setSameFiles(true);

                setTimeout(() => {
                    setSameFiles(false);
                }, 2000);
                return;
            }

            const filesToAdd: Record<string, ArrayBuffer> = {};

            for (let i = 0; i < filenames.length; i++) {
                filesToAdd[filenames[i]] = readerResults[i];
            }

            startTransition(() => {
                addFiles(filesToAdd);
            });
        },
        [addFiles, sceneCollection, setSameFiles]
    );

    const handleDeleteObject: () => void = useCallback((): void => {
        if (!selectedObject?.name) return;

        globalObject.canGenerate = false;
        startTransition(() => {
            deleteObject(selectedObject.name);
        });
    }, [deleteObject, selectedObject]);

    const handleClearAll: () => void = useCallback((): void => {
        if (window.confirm("Remove all from scene?")) {
            startTransition(() => {
                clearAll();
            });
            const sceneLength = globalObject.scene?.children?.length;
            if (sceneLength) {
                for (let i = sceneLength - 1; i >= 0; i--) {
                    const obj = globalObject.scene?.children[i];
                    if (
                        (obj as Object3D).name === "r3f-perf" ||
                        (obj as Object3D).type === "GridHelper" ||
                        (obj as Object3D).type === "AmbientLight"
                    ) {
                        break;
                    }
                    globalObject.scene?.remove(obj as Object3D);
                }
            }
        }
    }, [clearAll]);

    const handleAddLight: (type: string) => void = useCallback(
        (type: string): void => {
            if (
                type !== "PointLight" &&
                type !== "SpotLight" &&
                type !== "DirectionalLight"
            )
                return;
            if (!globalObject.scene) {
                console.error("No scene found.");
                return;
            }

            let lightName = type;
            let lightNumber = 0;

            while (Object.keys(sceneCollection).includes(lightName)) {
                lightNumber++;
                lightName = `${type}${lightNumber}`;
            }

            const lightObject: ILightObject = {
                category: "light",
                name: lightName,
                type: type,
                helper: null,
                transforms: {
                    position: { x: 3, y: 3, z: 3 },
                },
                properties: {
                    color: "#ffffff",
                    intensity: 1,
                    shadowBias: 0.0,
                    shadowNormalBias: 0.04,
                    castShadow: true,
                    visible: true,
                    frustumCulled: true,
                    renderOrder: 0,
                },
            };

            if (type === "DirectionalLight") {
                const light: IDirectionalLightObject = {
                    ...lightObject,
                    type: "DirectionalLight",
                    properties: {
                        ...lightObject.properties,
                        target: { x: 0, y: 0, z: 0 },
                    },
                };

                startTransition(() => {
                    addLight(lightName, light);
                });
            } else if (type === "PointLight") {
                const light: IPointLightObject = {
                    ...lightObject,
                    type: "PointLight",
                    properties: {
                        ...lightObject.properties,
                        distance: 0,
                        decay: 2,
                    },
                };

                startTransition(() => {
                    addLight(lightName, light);
                });
            } else if (type === "SpotLight") {
                const light: ISpotLightObject = {
                    ...lightObject,
                    type: "SpotLight",
                    properties: {
                        ...lightObject.properties,
                        target: { x: 0, y: 0, z: 0 },
                        distance: 0,
                        angle: Math.PI / 4,
                        penumbra: 1,
                        decay: 2.0,
                    },
                };

                startTransition(() => {
                    addLight(lightName, light);
                });
            }
        },
        [addLight, sceneCollection]
    );

    useEffect(() => {
        const handleKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent) => {
            if (e.key === "Delete") {
                handleDeleteObject();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleDeleteObject]);

    return {
        readSceneData,
        exportSceneData,
        onDrop,
        handleDeleteObject,
        handleClearAll,
        handleAddLight,
    };
};
