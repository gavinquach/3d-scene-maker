import { memo, useRef, useState } from "react";
import FileUpload from "./FileUpload.jsx";
import NewTabLink from "./NewTabLink.jsx";

const NavigationBar = ({ onDrop, handleDeleteObject, handleClearAll }) => {
    const [isWindowOn, setIsWindowOn] = useState(false);

    const toggleWindow = (bool = null) => {
        setIsWindowOn(bool === null ? !isWindowOn : bool);
    };
    const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);

    const toggleSecondDropdown = () => {
        setIsSecondDropdownOpen(!isSecondDropdownOpen);
    };

    const isHoveringOverFileUpload = useRef(false);

    return (
        <header className="bg-gray-900 py-2 px-4 flex items-center justify-between">
            <nav>
                <ul className="flex flex-row justify-left">
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
                            onClick={toggleSecondDropdown}
                        >
                            Object
                        </div>
                        {isSecondDropdownOpen && (
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
