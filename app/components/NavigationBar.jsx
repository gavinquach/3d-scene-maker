import { memo, useRef, useState } from "react";
import FileUpload from "./FileUpload.jsx";
import NewTabLink from "./NewTabLink.jsx";

// import { handleAddLight } from "../utils/sceneUtils.ts";

const NavigationBar = ({
    onDrop,
    handleDeleteObject,
    handleClearAll,
    readSceneData,
    exportSceneData,
    handleAddLight,
}) => {
    const fileInputRef = useRef(null);
    const isHoveringOverFileUpload = useRef(false);
    const [isWindowOn, setIsWindowOn] = useState(false);
    const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
    const [isObjectDropdownOpen, setIsObjectDropdownOpen] = useState(false);
    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
    const [isAddLightDropdownOpen, setIsAddLightDropdownOpen] = useState(false);

    // const closeAllDropdowns = () => {
    //     setIsWindowOn(false);
    //     setIsFileDropdownOpen(false);
    //     setIsObjectDropdownOpen(false);
    //     setIsAddDropdownOpen(false);
    //     setIsAddLightDropdownOpen(false);
    // };

    const toggleWindow = (bool = null) => {
        setIsWindowOn(bool === null ? !isWindowOn : bool);
        setIsFileDropdownOpen(false);
        setIsObjectDropdownOpen(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
    };

    const toggleFileDropdown = () => {
        setIsFileDropdownOpen(!isFileDropdownOpen);
        setIsWindowOn(false);
        setIsObjectDropdownOpen(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
    };

    const toggleObjectDropdown = () => {
        setIsObjectDropdownOpen(!isObjectDropdownOpen);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddDropdownOpen(false);
        setIsAddLightDropdownOpen(false);
    };

    const toggleAddDropdown = () => {
        setIsAddDropdownOpen(!isAddDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
        setIsAddLightDropdownOpen(false);
    };

    const toggleAddLightDropdown = () => {
        setIsAddLightDropdownOpen(!isAddLightDropdownOpen);
        setIsObjectDropdownOpen(false);
        setIsFileDropdownOpen(false);
        setIsWindowOn(false);
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
                            className="text-white text-sm px-4 py-2 cursor-pointer"
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
                            className="text-white text-sm px-4 py-2 cursor-pointer"
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
                            className="text-white text-sm px-4 py-2 cursor-pointer"
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
                                        {/* <li
                                            className="py-1 px-4 hover:bg-gray-600"
                                            onClick={() => handleAddLight("hemi")}
                                        >
                                            HemisphereLight
                                        </li> */}
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
                            </ul>
                        )}
                    </li>
                    <li className="relative">
                        <div
                            className="text-white text-sm px-4 py-2 cursor-pointer"
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
                    <li className="text-white text-sm px-4 py-2">
                        <NewTabLink href="https://github.com/gavinquach/3d-scene-maker">
                            Github
                        </NewTabLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default memo(NavigationBar);
