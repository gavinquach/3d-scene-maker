import { memo } from "react";

const DirectoryTree = ({ results, selectedObject, setSelectedObject }) => {
    const handleToggle = (e) => {
        e.currentTarget.nextElementSibling.classList.toggle("hidden");
    };

    const handleClickObjectName = (e) => {
        setSelectedObject(null, e.target.innerText);
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
                    {results.map(({ name }) => (
                        <li
                            key={name}
                            className={`mb-2 py-0.4 pl-4 cursor-default hover:cursor-default
                            ${selectedObject?.name === name ? "active-item" : ""
                                }`}
                            onClick={handleClickObjectName}
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
