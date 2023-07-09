"use client";

import { ChangeEvent, startTransition, useCallback, useEffect } from "react";
import { Object3D } from "three";

import JSZip from "jszip";
import { saveAs } from "file-saver";

// import ControlMenu from "./components/Controls/ControlMenu.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import ToolShelf from "./components/HUD/ToolShelf.tsx";
import Viewer from "./components/Viewer.jsx";
import ViewportShadingSelector from "./components/HUD/ViewportShadingSelector.tsx";

import useStore from "./utils/store.js";
import globalObject from "./utils/globalObjects.ts";

import { EXPORT_FILE_NAME, SCENE_DATA_FILE_NAME } from "./utils/constants.ts";
import { generateRandomString } from "./utils/functions.ts";

export default function Home(): JSX.Element {
    const addFiles = useStore((state) => state.addFiles);
    const files = useStore((state) => state.files);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const selectedObject = useStore((state) => state.selectedObject);
    const deleteObject = useStore((state) => state.deleteObject);
    const setSameFiles = useStore((state) => state.setSameFiles);
    const clearAll = useStore((state) => state.clearAll);
    const loadGLTF = useStore((state) => state.loadGLTF);
    const addLight = useStore((state) => state.addLight);
    const setTransformMode = useStore((state) => state.setTransformMode);

    const readSceneData: (event: ChangeEvent<HTMLInputElement>) => Promise<void> =
        useCallback(
            async (event: ChangeEvent<HTMLInputElement>) => {
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
                        throw new Error(
                            "No scene data file found in the zip archive."
                        );
                    }
                } catch (error) {
                    console.error("Error handling file:", error);
                }

                globalObject.canGenerate = false;
                startTransition(() => {
                    clearAll();
                    addFiles(binFilesMap);
                    loadGLTF(parsedData.data);
                });
            },
            [addFiles, clearAll, loadGLTF]
        );

    const exportSceneData: () => Promise<void> = useCallback(async () => {
        const zip = new JSZip();

        // Add the JSON data to the zip file
        const sceneData = { data: sceneCollection };
        const jsonData = JSON.stringify(sceneData, null, 2);
        zip.file(SCENE_DATA_FILE_NAME, jsonData, { compression: 'DEFLATE' });

        // Iterate over each ArrayBuffer and create a blob from it
        for (const [filename, buffer] of Object.entries(files)) {
            // Add the blob as a .bin file to the zip
            const blob = new Blob([buffer as BlobPart]);
            zip.file(`${filename}.bin`, blob, { compression: 'DEFLATE' });
        };

        // Generate the zip file
        const zipContent = await zip.generateAsync({ type: "blob" });

        // Save the file
        saveAs(zipContent, `${EXPORT_FILE_NAME}.zip`);
    }, [files, sceneCollection]);

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
            for (const sceneKey of Object.keys(sceneCollection)) {
                const sceneName: string = sceneCollection[sceneKey].name;
                const index: number | undefined = filenameIndices[sceneName];
                if (index !== undefined) {
                    filenames.splice(index, 1);
                    readerResults.splice(index, 1);
                }
            }

            if (filenames.length === 0) {
                setSameFiles(true);

                setTimeout(() => {
                    setSameFiles(false);
                }, 2000);
                return;
            }

            const files: Record<string, ArrayBuffer> = {};

            for (let i = 0; i < filenames.length; i++) {
                files[filenames[i]] = readerResults[i];
            }

            startTransition(() => {
                addFiles(files);
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

            startTransition(() => {
                addLight(lightName, {
                    category: "light",
                    name: lightName,
                    transforms: {
                        position: { x: 3, y: 3, z: 3 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 },
                    },
                    attributes: {
                        type: type,
                    },
                    properties: {
                        color: "#ffffff",
                        intensity: 1,
                        castShadow: false,
                    },
                });
            });
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

    return (
        <>
            <div className="max-w-screen flex h-screen max-h-screen w-screen flex-col">
                <div className="flex h-full max-h-full w-full max-w-full">
                    <div className="flex h-screen w-full flex-col">
                        <NavigationBar
                            onDrop={onDrop}
                            handleDeleteObject={handleDeleteObject}
                            handleClearAll={handleClearAll}
                            readSceneData={readSceneData}
                            exportSceneData={exportSceneData}
                            handleAddLight={handleAddLight}
                        />
                        <div className="flex-grow overflow-y-auto">
                            <ToolShelf setTransformMode={setTransformMode} />
                            <ViewportShadingSelector />
                            <Viewer />
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>

            <p
                style={{ zIndex: 1000 }}
                className="fixed bottom-2 right-2 cursor-default select-none hover:cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://github.com/gavinquach/", "_blank", "noreferrer");
                }}
            >
                3D Scene Maker (W.I.P) by gavinquach
            </p>
        </>
    );
}
