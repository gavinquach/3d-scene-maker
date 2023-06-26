import { memo, useRef, useState } from "react";
import FileUpload from "./FileUpload.jsx";
import NewTabLink from "./NewTabLink.jsx";

const NavigationBar = ({
    onDrop,
    handleDeleteObject,
    handleClearAll,
    readSceneData,
    exportSceneData,
}) => {
    const [isWindowOn, setIsWindowOn] = useState(false);

    const toggleWindow = (bool = null) => {
        setIsWindowOn(bool === null ? !isWindowOn : bool);
    };
    const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);

    const toggleFileDropdown = () => {
        setIsFileDropdownOpen(!isFileDropdownOpen);
    };
    const [isObjectDropdownOpen, setIsObjectDropdownOpen] = useState(false);

    const toggleObjectDropdown = () => {
        setIsObjectDropdownOpen(!isObjectDropdownOpen);
    };

    const isHoveringOverFileUpload = useRef(false);

    const fileInputRef = useRef(null);

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
                            onClick={(e) => toggleFileDropdown(e)}
                        >
                            File
                        </div>
                        {isFileDropdownOpen && (
                            <ul className="absolute w-32 top-full left-0 z-50 bg-gray-800 text-white rounded shadow-lg mt-1">
                                <li onClick={handleImportClick} className="py-1 px-4 hover:bg-gray-600">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={readSceneData}
                                    />
                                    <span className="w-max h-max pointer-events-auto">
                                        Import scene data
                                    </span>
                                </li>
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={exportSceneData}
                                >
                                    <span className="pointer-events-none">Export Scene Data</span>
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
                            onClick={toggleObjectDropdown}
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
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={() => handleClearAll()}
                                >
                                    <span className="pointer-events-none">Delete all</span>
                                </li>
                                <li
                                    className="py-1 px-4 hover:bg-gray-600"
                                    onClick={() => console.log("Clicked option 3")}
                                >
                                    <span className="pointer-events-none">Option 3</span>
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
