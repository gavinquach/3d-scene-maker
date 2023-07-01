"use client";

import { ChangeEvent, startTransition, useCallback, useEffect } from "react";
import { Object3D, Scene } from "three";

import JSZip from "jszip";
import { saveAs } from "file-saver";

import ControlMenu from "./components/Controls/ControlMenu.jsx";
import DirectoryTree from "./components/Sidebar/DirectoryTree.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Properties from "./components/Sidebar/Properties.jsx";
import Viewer from "./components/Viewer.jsx";

import useStore from "./utils/store.js";
import globalObject from "./utils/globalObjects.ts";

import { EXPORT_FILE_NAME, TRANSFORMS_FILE_NAME } from "./utils/constants.ts";
import { generateRandomString } from "./utils/functions.ts";

export default function Home(): JSX.Element {
    const addMultipleFilesToStore = useStore(
        (state) => state.addMultipleFilesToStore
    );
    const files = useStore((state) => state.files);
    const sceneCollection = useStore((state) => state.sceneCollection);
    const results = useStore((state) => state.results);
    const selectedObject = useStore((state) => state.selectedObject);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const deleteObject = useStore((state) => state.deleteObject);
    const deleteFromTransforms = useStore((state) => state.deleteFromTransforms);
    const setSameFiles = useStore((state) => state.setSameFiles);
    const clearAll = useStore((state) => state.clearAll);
    const objectTransforms = useStore((state) => state.objectTransforms);
    const setTransformsObject = useStore((state) => state.setTransformsObject);
    const lights = useStore((state) => state.lights);
    const addLight = useStore((state) => state.addLight);

    const readSceneData: (event: ChangeEvent<HTMLInputElement>) => Promise<void> =
        useCallback(
            async (event: ChangeEvent<HTMLInputElement>) => {
                const file: File | undefined = event.target.files?.[0];

                // Reset the input field to allow uploading the same file again
                event.target.value = generateRandomString(Math.random() * 10);

                if (!file) return;

                const binFilesMap: Record<string, ArrayBuffer> = {};
                let parsedData: any;
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
                    const jsonFile = zipData.files[TRANSFORMS_FILE_NAME];
                    if (jsonFile) {
                        const jsonData = await jsonFile.async("text");
                        parsedData = JSON.parse(jsonData);
                    } else {
                        throw new Error(
                            "No scene object transforms file found in the zip archive."
                        );
                    }
                } catch (error) {
                    console.error("Error handling file:", error);
                }

                // Add the files to the store
                const readerResults = Object.values(binFilesMap);
                const filenames = Object.keys(binFilesMap);
                startTransition(() => {
                    clearAll();
                    addMultipleFilesToStore(readerResults, filenames);
                    // set is import to let application set mesh transforms
                    globalObject.isNotImport = false;
                    setTransformsObject(parsedData.transforms);
                });
            },
            [addMultipleFilesToStore, clearAll, setTransformsObject]
        );

    const exportSceneData: () => Promise<void> = useCallback(async () => {
        const zip = new JSZip();

        // Add the JSON data to the zip file
        const sceneData = { transforms: objectTransforms };
        const jsonData = JSON.stringify(sceneData);
        zip.file(TRANSFORMS_FILE_NAME, jsonData);

        // Iterate over each ArrayBuffer and create a blob from it
        for (let i = 0; i < Object.keys(files).length; i++) {
            const { buffer, name } = files[Object.keys(files)[i]];
            const blob = new Blob([buffer]);

            // Add the blob as a .bin file to the zip
            zip.file(`${name}.bin`, blob);
        }

        // Generate the zip file
        const zipContent = await zip.generateAsync({ type: "blob" });

        // Save the file
        saveAs(zipContent, `${EXPORT_FILE_NAME}.zip`);
    }, [files, objectTransforms]);

    const onDrop: (acceptedFiles: File[]) => Promise<void> = useCallback(
        async (acceptedFiles: File[]) => {
            const readerResults = await Promise.all(
                acceptedFiles.map((file) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = () => reject(reader);
                        reader.readAsArrayBuffer(file);
                    });
                })
            );

            const filenames = acceptedFiles.map(({ name }) =>
                name.replace(/ /g, "_").replace(/\.glb|gltf/g, "")
            );

            // remove duplicates
            for (let i = 0; i < Object.keys(results).length; i++) {
                const index = filenames.indexOf(results[Object.keys(results)[i]].name);
                if (index > -1) {
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

            startTransition(() => {
                addMultipleFilesToStore(readerResults, filenames);
            });
        },
        [results]
    );

    const handleDeleteObject: () => void = useCallback((): void => {
        if (!selectedObject?.name) return;

        globalObject.canGenerate = false;
        startTransition(() => {
            deleteObject(selectedObject.name);
            deleteFromTransforms(selectedObject.name);
        });
    }, [selectedObject]);

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

            while (Object.keys(lights).includes(lightName)) {
                lightNumber++;
                lightName = `${type}${lightNumber}`;
            }

            startTransition(() => {
                addLight(lightName, {
                    type: type,
                    name: lightName,
                    properties: {
                        color: "#ffffff",
                        intensity: 1,
                        castShadow: false,
                    },
                });
            });
        },
        [addLight, lights]
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
            <ControlMenu />

            <div className="flex flex-col h-screen max-h-screen w-screen max-w-screen">
                <div className="flex h-full max-h-full w-full max-w-full">
                    {/* Scene */}
                    <div className="flex flex-col h-screen w-full">
                        <NavigationBar
                            onDrop={onDrop}
                            handleDeleteObject={handleDeleteObject}
                            handleClearAll={handleClearAll}
                            readSceneData={readSceneData}
                            exportSceneData={exportSceneData}
                            handleAddLight={handleAddLight}
                        />
                        <div className="flex-grow overflow-y-auto">
                            <Viewer />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="styled-scrollbar max-h-screen w-1/4 bg-gray-800 overflow-hidden">
                        {/* Top Half */}
                        <div className="h-1/3 overflow-y-scroll">
                            <DirectoryTree
                                sceneCollection={sceneCollection}
                                selectedObject={selectedObject}
                                setSelectedObject={setSelectedObject}
                            />
                        </div>

                        {/* Bottom Half */}
                        <div className="h-2/3 overflow-y-scroll bg-gray-700">
                            <Properties />
                        </div>
                    </div>
                </div>
            </div>

            <p
                style={{ zIndex: 1000 }}
                className="fixed bottom-2 right-2 cursor-default hover:cursor-pointer select-none"
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
