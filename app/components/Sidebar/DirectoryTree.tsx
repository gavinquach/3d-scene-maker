import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../../utils/store.js";
import globalObject from "@/app/utils/globalObject.ts";
import { Scene } from "three";

const UpperHalfWrapper = styled.div`
    height: 33.3%;
    max-height: 35%;
    overflow-y: auto;
`;

export const DirectoryTree: React.FC = () => {
    // const sceneCollection = useStore((state) => state.sceneCollection);
    const selectedObject = useStore((state) => state.selectedObject);
    const setSelectedObject = useStore((state) => state.setSelectedObject);

    const [sceneCollection, setSceneCollection] = useState<Scene>();

    useLayoutEffect(() => {
        setSceneCollection(globalObject.scene as Scene);
    }, []);

    useLayoutEffect(() => {
        console.log(sceneCollection);
    }, [sceneCollection]);

    const handleToggle: React.MouseEventHandler<HTMLSpanElement> = (e) => {
        e.currentTarget?.nextElementSibling?.classList.toggle("hidden");
    };

    const handleClickObjectName = (name: string) => {
        setSelectedObject({ objectName: name });
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
                        {/* {Object.keys(sceneCollection).map((name) => (
                            <li
                                key={name}
                                className={`mb-2 py-0.4 pl-4 cursor-default hover:cursor-default
                            ${selectedObject?.name === name ? "active-item" : ""
                                    }`}
                                onClick={() => handleClickObjectName(name)}
                            >
                                {name}
                            </li>
                        ))} */}
                    </ul>
                </li>
            </ul>
        </UpperHalfWrapper>
    );
};
