import React, { useState } from "react";

import FileUploadSmall from "./FileUploadSmall.jsx";
import NewTabLink from "./NewTabLink.jsx";

const NavigationBar = ({ onDrop }) => {
    const [isWindowOn, setIsWindowOn] = useState(false);

    const toggleWindow = () => {
        setIsWindowOn(!isWindowOn);
    };

    return (
        <header className="bg-gray-900 py-2 px-4 flex items-center justify-between">
            <nav>
                <ul className="flex flex-row justify-left">
                    <li className="relative">
                        <div
                            className="text-white text-sm px-4 py-2 cursor-pointer"
                            onClick={toggleWindow}
                        >
                            Upload File
                        </div>
                        {isWindowOn && <FileUploadSmall onDrop={onDrop} />}
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

export default NavigationBar;
