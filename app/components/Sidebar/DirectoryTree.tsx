import { MouseEventHandler, memo } from "react";
import useStore from "../../utils/store.js";
import { styled } from "styled-components";

const UpperHalfWrapper = styled.div`
    height: 33.3%;
    overflow-y: auto;
`;

const DirectoryTree: () => JSX.Element = () => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const selectedObject = useStore((state) => state.selectedObject);
    const setSelectedObject = useStore((state) => state.setSelectedObject);

    const handleToggle:MouseEventHandler<HTMLSpanElement> = (event) => {
        // const target = e.currentTarget as HTMLSpanElement;
        event.currentTarget?.nextElementSibling?.classList.toggle("hidden");
    };

    const handleClickObjectName = (name: string) => {
        setSelectedObject(name);
    };

    return (
        <UpperHalfWrapper>
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
        </UpperHalfWrapper>
    );
};

export default memo(DirectoryTree);
