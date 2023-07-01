import { memo } from "react";

const DirectoryTree = ({ sceneCollection, selectedObject, setSelectedObject }) => {
    const handleToggle = (e) => {
        e.currentTarget.nextElementSibling.classList.toggle("hidden");
    };

    const handleClickObjectName = (name) => {
        setSelectedObject(null, name);
    };

    return (
        <ul className="directory-tree list-none select-none">
            <li className="mb-2">
                <span
                    className="folder font-bold pl-4 cursor-pointer"
                    onClick={handleToggle}
                >
                    Scene Collection
                </span>
                <ul className="pl-8">
                    {Object.keys(sceneCollection).map((name) => (
                        <li
                            key={name}
                            className={`mb-2 py-0.4 pl-4 cursor-default hover:cursor-default
                            ${selectedObject?.name === name ? "active-item" : ""
                                }`}
                            onClick={() => handleClickObjectName(name)}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
    );
};

export default memo(DirectoryTree);
