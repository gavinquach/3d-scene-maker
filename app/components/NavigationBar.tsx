import { FC, useRef, useState } from "react";
import { FileUpload } from "./FileUpload.tsx";
import { NewTabLink } from "./NewTabLink.tsx";
import { SceneFunctions } from "@/app/utils/SceneFunctions.ts";

export const NavigationBar: FC = () => {
    const {
        readSceneData,
        exportSceneData,
        onDrop,
        handleDeleteObject,
        handleClearAll,
        handleAddLight,
    } = SceneFunctions();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const isHoveringOverFileUpload = useRef<boolean>(false);

    const [isWindowOn, setIsWindowOn] = useState<boolean>(false);
    const [isFileDropdownOpen, setIsFileDropdownOpen] = useState<boolean>(false);
    const [isObjectDropdownOpen, setIsObjectDropdownOpen] = useState<boolean>(false);
    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState<boolean>(false);
    const [isAddLightDropdownOpen, setIsAddLightDropdownOpen] = useState<boolean>(false);
    const [isAddMeshDropdownOpen, setIsAddMeshDropdownOpen] = useState<boolean>(false);

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            // Enter fullscreen mode
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const closeAllDropdowns: () => void = () => {
        setIsWindowOn(false);
        setIsFileDropdownOpen(false);
        setIsObjectDropdownOpen(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleWindow: (bool: boolean) => void = (bool) => {
        setIsWindowOn(bool);
        setIsFileDropdownOpen(false);
        setIsObjectDropdownOpen(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleFileDropdown: () => void = () => {
        setIsFileDropdownOpen(!isFileDropdownOpen);
        setIsWindowOn(false);
        setIsObjectDropdownOpen(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleObjectDropdown: () => void = () => {
        setIsObjectDropdownOpen(!isObjectDropdownOpen);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleAddDropdown: () => void = () => {
        setIsAddDropdownOpen(!isAddDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleAddLightDropdown: () => void = () => {
        setIsAddLightDropdownOpen(!isAddLightDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleAddMeshDropdown: () => void = () => {
        setIsAddMeshDropdownOpen(!isAddMeshDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddLightDropdownOpen(false);
    };

    const handleImportClick: () => void = () => {
        fileInputRef.current?.click();
    };

    return (
        <header className="flex items-center justify-between bg-gray-900/80 px-4 py-1">
            <nav>
                <ul className="justify-left flex select-none flex-row">
                    <li className="relative">
                        <div
                            className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-800"
                            onClick={() => toggleFileDropdown()}
                        >
                            File
                        </div>
                        {isFileDropdownOpen && (
                            <ul className="w-26 absolute left-0 top-full z-50 mt-1 rounded bg-gray-800 text-white shadow-lg">
                                <li
                                    className="px-4 py-1 hover:bg-gray-600"
                                    onClick={() => handleClearAll()}
                                >
                                    <span className="pointer-events-none">New</span>
                                </li>
                                <li
                                    onClick={handleImportClick}
                                    className="px-4 py-1 hover:bg-gray-600"
                                >
                                    <input
                                        type="file"
                                        accept=".zip"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={readSceneData}
                                        onClick={closeAllDropdowns}
                                    />
                                    <span className="pointer-events-auto h-max w-max">Open</span>
                                </li>
                                <li
                                    className="px-4 py-1 hover:bg-gray-600"
                                    onClick={() => {
                                        exportSceneData();
                                        closeAllDropdowns();
                                    }}
                                >
                                    <span className="pointer-events-none">Save</span>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="relative">
                        <div
                            className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-800"
                            onClick={() => toggleWindow(!isWindowOn)}
                            onDragOver={() => toggleWindow(true)}
                            onDragLeave={() => {
                                setTimeout(() => {
                                    if (!isHoveringOverFileUpload.current) {
                                        toggleWindow(false);
                                    }
                                }, 600);
                            }}
                        >
                            Upload File
                        </div>
                        {isWindowOn && (
                            <span
                                onDragOver={() => {
                                    toggleWindow(true);
                                    isHoveringOverFileUpload.current = true;
                                }}
                                onDragLeave={() => {
                                    isHoveringOverFileUpload.current = false;
                                    setTimeout(() => {
                                        if (!isHoveringOverFileUpload.current) {
                                            toggleWindow(false);
                                        }
                                    }, 600);
                                }}
                            >
                                <FileUpload small onDrop={onDrop} />
                            </span>
                        )}
                    </li>
                    <li className="relative">
                        <div
                            className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-800"
                            onClick={() => toggleAddDropdown()}
                        >
                            Add
                        </div>
                        {isAddDropdownOpen && (
                            <ul className="absolute left-0 top-full z-50 mt-1 w-28 rounded bg-gray-800 text-white shadow-lg">
                                <li
                                    className="px-4 py-1 hover:bg-gray-600"
                                    onClick={() => toggleAddLightDropdown()}
                                >
                                    <span>Light</span>
                                </li>
                                {isAddLightDropdownOpen && (
                                    <ul className="w-34 absolute left-28 top-0 z-50 mt-1 rounded bg-gray-800 text-white shadow-lg">
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                            onClick={() => {
                                                handleAddLight("DirectionalLight");
                                                closeAllDropdowns();
                                            }}
                                        >
                                            Directional Light
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                            onClick={() => {
                                                handleAddLight("PointLight");
                                                closeAllDropdowns();
                                            }}
                                        >
                                            Point Light
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                            onClick={() => {
                                                handleAddLight("SpotLight");
                                                closeAllDropdowns();
                                            }}
                                        >
                                            Spot Light
                                        </li>
                                    </ul>
                                )}
                                <li
                                    className="px-4 py-1 hover:bg-gray-600"
                                    onClick={() => toggleAddMeshDropdown()}
                                >
                                    <span>Mesh</span>
                                </li>
                                {isAddMeshDropdownOpen && (
                                    <ul className="w-34 absolute left-28 top-0 z-50 mt-1 rounded bg-gray-800 text-white shadow-lg">
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Box
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Capsule
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Circle
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Cone
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Cylinder
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Dodecahedron
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Edges
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Extrude
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Icosahedron
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Lathe
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Octahedron
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Plane
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Polyhedron
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Ring
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Shape
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Sphere
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Tetrahedron
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Torus
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            TorusKnot
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Tube
                                        </li>
                                        <li
                                            className="px-4 py-1 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Wireframe
                                        </li>
                                    </ul>
                                )}
                            </ul>
                        )}
                    </li>
                    <li className="relative">
                        <div
                            className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-800"
                            onClick={() => toggleObjectDropdown()}
                        >
                            Object
                        </div>
                        {isObjectDropdownOpen && (
                            <ul className="absolute left-0 top-full z-50 mt-1 w-28 rounded bg-gray-800 text-white shadow-lg">
                                <li
                                    className="px-4 py-1 hover:bg-gray-600"
                                    onClick={() => handleDeleteObject()}
                                >
                                    <span className="pointer-events-none">Delete</span>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="relative">
                        <div
                            className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-800"
                            onClick={handleFullscreenToggle}
                        >
                            Fullscreen
                        </div>
                    </li>
                    <li className="px-4 py-2 text-sm text-white hover:bg-gray-800">
                        <NewTabLink href="https://github.com/gavinquach/3d-scene-maker">
                            Github
                        </NewTabLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
