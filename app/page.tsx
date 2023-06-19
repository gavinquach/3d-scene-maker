"use client";

import { startTransition, useCallback, useEffect } from "react";

import ControlMenu from "./components/Controls/ControlMenu.jsx";
import FileUpload from "./components/FileUpload.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Viewer from "./components/Viewer.jsx";

import useStore from "./utils/store.js";

export default function Home() {
    const addMultipleFilesToStore = useStore(
        (state) => state.addMultipleFilesToStore
    );
    const files = useStore((state) => state.files);
    const selectedMesh = useStore((state) => state.selectedMesh);
    const deleteFromStore = useStore((state) => state.deleteFromStore);
    const setSameFile = useStore((state) => state.setSameFile);

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

            // TODO: REMOVE DUPLICATE FILES FROM LIST, KEEP THE NON DUPLICATES
            let sameFile = false;
            files.forEach((file: { buffer: ArrayBuffer; name: string }) => {
                if (filenames.includes(file.name)) {
                    sameFile = true;
                    setSameFile(sameFile);
                }
            });
            if (!sameFile) addMultipleFilesToStore(readerResults, filenames);
        },
        [files]
    );

    const handleDeleteObject = useCallback(() => {
        if (selectedMesh === null) return;
        startTransition(() => {
            deleteFromStore(selectedMesh);
        });
    }, [selectedMesh]);

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
                            <Viewer />
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
                className="fixed bottom-2 right-2 cursor-default hover:cursor-pointer"
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
