import React, { startTransition, useEffect, useState } from "react";
import { Scene } from "three";
import styled from "styled-components";
import useStore from "../../utils/store.js";
import globalObject from "@/app/utils/globalObject.ts";

const UpperHalfWrapper = styled.div`
  height: 33.3%;
  max-height: 35%;
  overflow-y: auto;
`;

export const DirectoryTree: React.FC = () => {
    const sceneCollection = useStore((state) => state.sceneCollection);
    const selectedObject = useStore((state) => state.selectedObject);
    const setSelectedObject = useStore((state) => state.setSelectedObject);
    const [sceneObjects, setSceneObjects] = useState({} as any);

    useEffect(() => {
        if (!globalObject.scene) return;

        // map scene objects' uuid to scene object name to sceneObjects
        const sceneUUIDs = {} as { [key: string]: any };
        (globalObject.scene as Scene).traverse((child: any) => {
            sceneUUIDs[child.name] = child.uuid;
        });
        setSceneObjects(sceneUUIDs);
    }, [globalObject.scene]);

    const handleToggle: () => void = () => {
        document.querySelector("#sceneList")?.classList.toggle("hidden");
    };

    const handleSetScene: () => void = () => {
        startTransition(() => {
            setSelectedObject({ objectRef: globalObject.scene });
        });
    };

    const handleClickObjectName = (name: string) => {
        // don't re-render if the same object is selected
        if (
            selectedObject.objRef?.uuid ===
            (globalObject.scene as Scene).getObjectByName(name)?.uuid
        )
            return;

        startTransition(() => {
            setSelectedObject({
                objectRef: (globalObject.scene as Scene).getObjectByName(name),
            });
        });
    };

    // console.log(globalObject.scene?.children);

    return (
        <UpperHalfWrapper>
            <ul className="directory-tree select-none list-none">
                <li className="mb-2">
                    <ul>
                        <li
                            className={`py-0.4 mb-2 cursor-pointer pl-4
                            ${selectedObject?.objRef?.type === "Scene"
                                    ? "active-item"
                                    : ""
                                }`}
                            onClick={(e) => {
                                handleSetScene();
                                handleToggle();
                            }}
                        >
                            Scene
                        </li>
                    </ul>
                    <ul id="sceneList" className="pl-8">
                        {/* {scene?.children.map((child: any) => ( */}
                        {Object.keys(sceneCollection).map((name) => (
                            <li
                                key={sceneObjects[name]}
                                value={name}
                                className={`py-0.4 mb-2 cursor-default pl-4 hover:cursor-default
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
