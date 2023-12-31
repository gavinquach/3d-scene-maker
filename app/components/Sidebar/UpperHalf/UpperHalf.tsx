import React, { startTransition, useEffect, useState } from "react";
import { Scene } from "three";

import useStore from "../../../utils/store.js";
import globalObject from "@/app/utils/globalObject.ts";
import { generateRandomString } from "@/app/utils/functions.ts";

import { UpperHalfStyled } from "./UpperHalfStyled.ts";

export const UpperHalf: React.FC = () => {
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

    // const handleToggle: () => void = () => {
    //     document.querySelector("#sceneList")?.classList.toggle("hidden");
    // };

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
                objectName: name,
                objectRef: (globalObject.scene as Scene).getObjectByName(name),
            });
        });
    };

    return (
        <UpperHalfStyled>
            <ul className="directory-tree select-none list-none">
                <li className="mb-2">
                    <ul>
                        <li
                            className={`py-0.4 mb-2 pl-4
                            ${selectedObject?.objRef?.type === "Scene"
                                    ? "active-item"
                                    : ""
                                }`}
                            onClick={() => {
                                handleSetScene();
                                // handleToggle();
                            }}
                        >
                            Scene
                        </li>
                    </ul>
                    <ul id="sceneList" className="pl-8">
                        {/* {scene?.children.map((child: any) => ( */}
                        {Object.keys(sceneCollection).map((name) => (
                            <li
                                key={name + '_' + generateRandomString(5)}
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
        </UpperHalfStyled>
    );
};
