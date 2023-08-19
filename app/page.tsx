"use client";

import { JSX } from "react";
import { Branding } from "./components/Branding.tsx";
import { NavigationBar } from "./components/NavigationBar.tsx";
import { Sidebar } from "./components/Sidebar/Sidebar.tsx";
import { ToolShelf } from "./components/HUD/ToolShelf/ToolShelf.tsx";
import { Viewer } from "./components/3DScene/Viewer.tsx";

export default function Home(): JSX.Element {
    return (
        <>
            <div className="max-w-screen flex h-screen max-h-screen w-screen flex-col">
                <div className="flex h-full max-h-full w-full max-w-full">
                    <div className="flex h-screen w-full flex-col">
                        <NavigationBar />
                        <div className="flex-grow select-none overflow-y-auto">
                            <ToolShelf />
                            <Viewer />
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>

            <Branding />
        </>
    );
}
