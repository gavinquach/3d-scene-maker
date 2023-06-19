"use client";

import { startTransition, useCallback, useEffect } from "react";

import ControlMenu from "./components/Controls/ControlMenu.jsx";
import FileUpload from "./components/FileUpload.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Scene from "./components/Scene.jsx";

import useStore from "./utils/store.js";

export default function Home() {
    const addMultipleFilesToStore = useStore(
        (state) => state.addMultipleFilesToStore
    );
    const files = useStore((state) => state.files);
    const selectedMesh = useStore((state) => state.selectedMesh);
    const deleteFromStore = useStore((state) => state.deleteFromStore);

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

            let sameFile = false;
            files.map((file: { buffer: ArrayBuffer; name: string }) => {
                if (filenames.includes(file.name)) {
                    sameFile = true;
                }
            });
            if (!sameFile) addMultipleFilesToStore(readerResults, filenames);
        },
        [addMultipleFilesToStore]
    );

    const handleDeleteObject = () => {
        if (selectedMesh) {
            startTransition(() => {
                deleteFromStore(selectedMesh);
            });
        }
    };

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
                    />
                    <div className="flex flex-grow">
                        <div className="flex-grow">
                            <Scene />
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
        </>
    );
}
