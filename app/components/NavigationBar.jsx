import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const FileUpload = dynamic(() => import("./FileUpload.tsx").then((mod) => mod.FileUpload));
const NewTabLink = dynamic(() => import("./NewTabLink.tsx").then((mod) => mod.NewTabLink));

export const NavigationBar = ({
    onDrop,
    handleDeleteObject,
    handleClearAll,
    readSceneData,
    exportSceneData,
    handleAddLight,
}) => {
    const fileInputRef = useRef(null);
    const isHoveringOverFileUpload = useRef(false);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isWindowOn, setIsWindowOn] = useState(false);
    const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
    const [isObjectDropdownOpen, setIsObjectDropdownOpen] = useState(false);
    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
    const [isAddLightDropdownOpen, setIsAddLightDropdownOpen] = useState(false);
    const [isAddMeshDropdownOpen, setIsAddMeshDropdownOpen] = useState(false);

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            // Enter fullscreen mode
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    // const closeAllDropdowns = () => {
    //     setIsWindowOn(false);
    //     setIsFileDropdownOpen(false);
    //     setIsObjectDropdownOpen(false);
    //     setIsAddDropdownOpen(false);
    //     setIsAddLightDropdownOpen(false);
    //     setIsAddMeshDropdownOpen(false);
    // };

    const toggleWindow = (bool = null) => {
        setIsWindowOn(bool === null ? !isWindowOn : bool);
        setIsFileDropdownOpen(false);
        setIsObjectDropdownOpen(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleFileDropdown = () => {
        setIsFileDropdownOpen(!isFileDropdownOpen);
        setIsWindowOn(false);
        setIsObjectDropdownOpen(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleObjectDropdown = () => {
        setIsObjectDropdownOpen(!isObjectDropdownOpen);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleAddDropdown = () => {
        setIsAddDropdownOpen(!isAddDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddLightDropdownOpen(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleAddLightDropdown = () => {
        setIsAddLightDropdownOpen(!isAddLightDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddMeshDropdownOpen(false);
    };

    const toggleAddMeshDropdown = () => {
        setIsAddMeshDropdownOpen(!isAddMeshDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddLightDropdownOpen(false);
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    return (
        <header className="bg-gray-900/80 py-1 px-4 flex items-center justify-between">
            <nav>
                <ul className="flex flex-row justify-left select-none">
                    <li className="relative">
                        <div
                            className="text-white text-sm px-4 py-2 cursor-pointer hover:bg-gray-800"
                            onClick={() => toggleFileDropdown()}
                        >
                            File
                        </div>
                        {isFileDropdownOpen && (
                            <ul className="absolute w-26 top-full left-0 z-50 bg-gray-800 text-white rounded shadow-lg mt-1">
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={() => handleClearAll()}
                                >
                                    <span className="pointer-events-none">New</span>
                                </li>
                                <li
                                    onClick={handleImportClick}
                                    className="py-1 px-4 hover:bg-gray-600"
                                >
                                    <input
                                        type="file"
                                        accept=".zip"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={readSceneData}
                                    />
                                    <span className="w-max h-max pointer-events-auto">Open</span>
                                </li>
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={exportSceneData}
                                >
                                    <span className="pointer-events-none">Save</span>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="relative">
                        <div
                            className="text-white text-sm px-4 py-2 cursor-pointer hover:bg-gray-800"
                            onClick={() => toggleWindow(null)}
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
                            className="text-white text-sm px-4 py-2 cursor-pointer hover:bg-gray-800"
                            onClick={() => toggleAddDropdown()}
                        >
                            Add
                        </div>
                        {isAddDropdownOpen && (
                            <ul className="absolute w-28 top-full left-0 z-50 bg-gray-800 text-white rounded shadow-lg mt-1">
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={() => toggleAddLightDropdown()}
                                >
                                    <span>Light</span>
                                </li>
                                {isAddLightDropdownOpen && (
                                    <ul className="absolute w-34 top-0 left-28 z-50 bg-gray-800 text-white rounded shadow-lg mt-1">
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                            onClick={() => handleAddLight("DirectionalLight")}
                                        >
                                            Directional Light
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                            onClick={() => handleAddLight("PointLight")}
                                        >
                                            Point Light
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                            onClick={() => handleAddLight("SpotLight")}
                                        >
                                            Spot Light
                                        </li>
                                    </ul>
                                )}
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={() => toggleAddMeshDropdown()}
                                >
                                    <span>Mesh</span>
                                </li>
                                {isAddMeshDropdownOpen && (
                                    <ul className="absolute w-34 top-0 left-28 z-50 bg-gray-800 text-white rounded shadow-lg mt-1">
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Box
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Capsule
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Circle
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Cone
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Cylinder
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Dodecahedron
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Edges
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Extrude
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Icosahedron
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Lathe
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Octahedron
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Plane
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Polyhedron
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Ring
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Shape
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Sphere
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Tetrahedron
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Torus
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            TorusKnot
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                        // onClick={() => handleAddMesh("")}
                                        >
                                            Tube
                                        </li>
                                        <li
                                            className="py-1 px-4 hover:bg-gray-600"
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
                            className="text-white text-sm px-4 py-2 cursor-pointer hover:bg-gray-800"
                            onClick={() => toggleObjectDropdown()}
                        >
                            Object
                        </div>
                        {isObjectDropdownOpen && (
                            <ul className="absolute w-28 top-full left-0 z-50 bg-gray-800 text-white rounded shadow-lg mt-1">
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={() => handleDeleteObject()}
                                >
                                    <span className="pointer-events-none">Delete</span>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="relative">
                        <div
                            className="text-white text-sm px-4 py-2 cursor-pointer hover:bg-gray-800"
                            onClick={handleFullscreenToggle}
                        >
                            Fullscreen
                        </div>
                    </li>
                    <li className="text-white text-sm px-4 py-2 hover:bg-gray-800">
                        <NewTabLink href="https://github.com/gavinquach/3d-scene-maker">
                            Github
                        </NewTabLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
