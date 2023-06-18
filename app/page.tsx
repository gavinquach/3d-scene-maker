"use client";

import { useCallback } from "react";

import ControlMenu from "./components/Controls/ControlMenu.jsx";
import FileUpload from "./components/FileUpload.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Scene from "./components/Scene.jsx";

import useStore from "./utils/store.js";

export default function Home() {
    const addMultipleFilesToStore = useStore(
        (state) => state.addMultipleFilesToStore
    );
    const buffers = useStore((state) => state.buffers);

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
            addMultipleFilesToStore(readerResults, filenames);
        },
        [addMultipleFilesToStore]
    );

    return (
        <>
            <ControlMenu hidden={buffers.length < 1} />
            {buffers.length > 0 ? (
                <div className="flex flex-col min-h-screen w-screen">
                    <NavigationBar onDrop={onDrop} />
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
