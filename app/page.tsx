"use client";

import { startTransition, useCallback, useEffect } from "react";

import ControlMenu from "./components/Controls/ControlMenu.jsx";
import DirectoryTree from "./components/DirectoryTree.jsx";
import FileUpload from "./components/FileUpload.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Viewer from "./components/Viewer.jsx";

import useStore from "./utils/store.js";

export default function Home() {
    const addMultipleFilesToStore = useStore(
        (state) => state.addMultipleFilesToStore
    );
    const files = useStore((state) => state.files);
    const results = useStore((state) => state.results);
    const selectedMesh = useStore((state) => state.selectedMesh);
    const setSelectedMesh = useStore((state) => state.setSelectedMesh);
    const deleteFromStore = useStore((state) => state.deleteFromStore);
    const deleteFromTransforms = useStore((state) => state.deleteFromTransforms);
    const setSameFiles = useStore((state) => state.setSameFiles);
    const clearAll = useStore((state) => state.clearAll);

    const onDrop = useCallback(
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
            for (const result of results) {
                const index = filenames.indexOf(result.name);
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
        [files, results]
    );

    const handleDeleteObject = useCallback(() => {
        if (!selectedMesh?.name) return;
        startTransition(() => {
            deleteFromStore(selectedMesh.name);
            deleteFromTransforms(selectedMesh.name);
        });
    }, [selectedMesh]);

    const handleClearAll = useCallback(() => {
        if (window.confirm("Remove all from scene?")) {
            startTransition(() => {
                clearAll();
            });
        }
    }, [clearAll]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Delete") {
                handleDeleteObject();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleDeleteObject]);

    return (
        <>
            <ControlMenu hidden={files.length < 1} />
            {files.length > 0 ? (
                <div className="flex flex-col min-h-screen w-screen">
                    <NavigationBar
                        onDrop={onDrop}
                        handleDeleteObject={handleDeleteObject}
                        handleClearAll={handleClearAll}
                    />
                    <div className="flex flex-grow">
                        <div className="flex-grow">
                            <Viewer />
                        </div>
                        <div className="w-1/4 bg-gray-800">
                            <DirectoryTree results={results} setSelectedMesh={setSelectedMesh} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <main
                        className="flex flex-col items-center justify-center flex-1"
                        style={{ height: "calc(100vh - 56px)" }}
                    >
                        <FileUpload onDrop={onDrop} />
                    </main>
                </div>
            )}

            <p
                className="fixed bottom-2 right-2 cursor-default hover:cursor-pointer pointer-events-none"
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
