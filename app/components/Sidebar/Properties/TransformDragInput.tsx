import React, { useState, useRef, useEffect } from "react";
import { PropertiesDragNumberInput } from "./PropertiesStyled";
import useStore from "@/app/utils/store";
import { Object3D } from "three";

export const TransformDragInput: React.FC<{
    transformMode: "position" | "rotation" | "scale";
    axis: "x" | "y" | "z";
}> = ({ transformMode = "position", axis = "x" }) => {
    const [inputValue, setInputValue] = useState<string>(transformMode === "scale" ? "1" : "0");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragStartPosition = useRef<number>(0);
    const dragStartValue = useRef<number>(0);
    // const setTransforms = useStore((state) => state.setTransforms);
    const selectedObject = useStore((state) => state.selectedObject);

    const setSceneObjectTransform = (newValue: number) => {
        if (transformMode === "position") {
            if (axis === "x") {
                (selectedObject.objRef as Object3D).position.x = newValue;
            } else if (axis === "y") {
                (selectedObject.objRef as Object3D).position.y = newValue;
            } else if (axis === "z") {
                (selectedObject.objRef as Object3D).position.z = newValue;
            }
        } else if (transformMode === "rotation") {
            if (axis === "x") {
                (selectedObject.objRef as Object3D).rotation.x = newValue;
            } else if (axis === "y") {
                (selectedObject.objRef as Object3D).rotation.y = newValue;
            } else if (axis === "z") {
                (selectedObject.objRef as Object3D).rotation.z = newValue;
            }
        } else if (transformMode === "scale") {
            if (axis === "x") {
                (selectedObject.objRef as Object3D).scale.x = newValue;
            } else if (axis === "y") {
                (selectedObject.objRef as Object3D).scale.y = newValue;
            } else if (axis === "z") {
                (selectedObject.objRef as Object3D).scale.z = newValue;
            }
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const deltaY: number = e.clientY - dragStartPosition.current;
            const step: number = 0.01;
            const newValue: number = dragStartValue.current - deltaY * step;

            setInputValue(newValue.toFixed(2).toString());
            setSceneObjectTransform(newValue);
        };

        const handleMouseUp = () => {
            document.body.style.cursor = "default";
            setIsDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const parsedValue = parseFloat(e.target.value);
        if (!isNaN(parsedValue)) {
            setSceneObjectTransform(parsedValue);
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const parsedValue = parseFloat(inputValue);
            if (!isNaN(parsedValue)) {
                setSceneObjectTransform(parsedValue);
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        document.body.style.cursor = "none";
        setIsDragging(true);

        // TODO: FIX NUMBER RESETTING TO 0 WHEN SELECTING THE INPUT FIELD
        if (transformMode === "position") {
            if (axis === "x") {
                dragStartValue.current = (selectedObject.objRef as Object3D).position.x;
            } else if (axis === "y") {
                dragStartValue.current = (selectedObject.objRef as Object3D).position.y;
            } else if (axis === "z") {
                dragStartValue.current = (selectedObject.objRef as Object3D).position.z;
            }
        } else if (transformMode === "rotation") {
            if (axis === "x") {
                dragStartValue.current = (selectedObject.objRef as Object3D).rotation.x;
            } else if (axis === "y") {
                dragStartValue.current = (selectedObject.objRef as Object3D).rotation.y;
            } else if (axis === "z") {
                dragStartValue.current = (selectedObject.objRef as Object3D).rotation.z;
            }
        } else if (transformMode === "scale") {
            if (axis === "x") {
                dragStartValue.current = (selectedObject.objRef as Object3D).scale.x;
            } else if (axis === "y") {
                dragStartValue.current = (selectedObject.objRef as Object3D).scale.y;
            } else if (axis === "z") {
                dragStartValue.current = (selectedObject.objRef as Object3D).scale.z;
            }
        }
        // dragStartValue.current = parseFloat(inputValue);
        dragStartPosition.current = e.clientY - dragStartValue.current / 0.01;
    };

    return (
        <PropertiesDragNumberInput
            type="number"
            step={0.01}
            value={
                (selectedObject.objectRef as Object3D)?.[transformMode]?.[axis] ||
                inputValue
            }
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onMouseDown={handleMouseDown}
        />
    );
};
