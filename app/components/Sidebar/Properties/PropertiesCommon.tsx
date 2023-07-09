import React, { startTransition, useEffect, useRef, useState } from "react";
import {
    PropertiesNumberInput,
    PropertiesTableContainer,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
    PropertiesTableRightColumnItem,
} from "./PropertiesStyled.ts";
import useStore from "@/app/utils/store";

export default function PropertiesCommon({ isScene = false }): React.JSX.Element {
    const [value, setValue] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragStartPosition = useRef<number>(0);

    const selectedObject = useStore((state) => state.selectedObject);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const deltaY = e.clientY - dragStartPosition.current;
            const step = 0.01;
            const newValue = value + (deltaY > 0 ? -step : step);
            startTransition(() => {
                setValue(parseFloat(newValue.toFixed(2)));
            });
        };

        const handleMouseUp = () => {
            document.body.style.cursor = 'default';
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, value]);

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        document.body.style.cursor = 'none';
        setIsDragging(true);
        dragStartPosition.current = e.clientY;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setValue(parseFloat(e.target.value));
        });
    };

    return (
        <PropertiesTableContainer>
            <PropertiesTableLeftColumn>Name</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>{isScene ? "Scene" : selectedObject.name}</PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Type</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>{isScene ? "Scene" : selectedObject.objRef.type}</PropertiesTableRightColumn>

            <PropertiesTableLeftColumn>Position</PropertiesTableLeftColumn>
            <PropertiesTableRightColumn>
                <PropertiesTableRightColumnItem>
                    <PropertiesNumberInput
                        type="numeric"
                        step="0.1"
                        value={value}
                        onChange={handleChange}
                        onMouseDown={handleMouseDown}
                    />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <PropertiesNumberInput
                        type="numeric"
                        step="0.1"
                        value={value}
                        onChange={handleChange}
                        onMouseDown={handleMouseDown}
                    />
                </PropertiesTableRightColumnItem>
                <PropertiesTableRightColumnItem>
                    <PropertiesNumberInput
                        type="numeric"
                        step="0.1"
                        value={value}
                        onChange={handleChange}
                        onMouseDown={handleMouseDown}
                    />
                </PropertiesTableRightColumnItem>
            </PropertiesTableRightColumn>
        </PropertiesTableContainer>
    );
}
