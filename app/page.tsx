"use client";

import dynamic from "next/dynamic";
import { JSX } from "react";

import { SceneFunctions } from "./utils/SceneFunctions.ts";
import { Sidebar } from "./components/Sidebar/Sidebar.tsx";

const NavigationBar = dynamic(
    () =>
        import("./components/NavigationBar.jsx").then((mod) => mod.NavigationBar),
    { ssr: true }
);
const ToolShelf = dynamic(
    () =>
        import("./components/HUD/ToolShelf/ToolShelf.tsx").then(
            (mod) => mod.ToolShelf
        ),
    { ssr: true }
);
const Viewer = dynamic(
    () => import("./components/3DScene/Viewer.tsx").then((mod) => mod.Viewer),
    { ssr: true }
);

export default function Home(): JSX.Element {
    const {
        readSceneData,
        exportSceneData,
        onDrop,
        handleDeleteObject,
        handleClearAll,
        handleAddLight,
    } = SceneFunctions();

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
                        <div className="flex-grow select-none overflow-y-auto">
                            <ToolShelf />
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
