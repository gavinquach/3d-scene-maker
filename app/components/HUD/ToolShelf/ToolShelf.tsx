import React, { startTransition, useEffect, useState } from "react";
import { ButtonStyled } from "./ToolShelfStyled";
import useStore from "@/app/utils/store";
import { LIGHT_TYPES } from "@/app/utils/constants";

const TopButton: React.FC<IButton> = ({ children, ...props }) => (
    <ButtonStyled side="top" {...props}>
        {children}
    </ButtonStyled>
);
const MiddleButton: React.FC<IButton> = ({ children, ...props }) => (
    <ButtonStyled {...props}>{children}</ButtonStyled>
);
const BottomButton: React.FC<IButton> = ({ children, ...props }) => (
    <ButtonStyled side="bottom" {...props}>
        {children}
    </ButtonStyled>
);

// const SmallGap: () => React.JSX.Element = () => <div className="mb-2" />;

export const ToolShelf: React.FC = () => {
    const [selected, setSelected] = useState<number>(0);
    const selectedObject = useStore((state) => state.selectedObject);
    const setTransformMode = useStore((state) => state.setTransformMode);

    const handleClick = (index: number) => {
        setSelected(index);
        startTransition(() => {
            setTransformMode(
                index === 1 ? "rotate" : index === 2 ? "scale" : "translate"
            );
        });
    };

    // set to translate mode when selecting a light
    useEffect(() => {
        if (LIGHT_TYPES.includes(selectedObject.objRef?.type)) {
            setSelected(0);
            startTransition(() => {
                setTransformMode("translate");
            });
        }
    }, [selectedObject]);

    return (
        <div className="absolute left-0 top-20 z-10 h-max w-28 p-4">
            <TopButton
                onClick={() => {
                    handleClick(0);
                }}
                selected={selected === 0}
            >
                <svg fill="white" viewBox="0 0 16 16" height="2.2em" width="2.2em">
                    <path
                        fillRule="evenodd"
                        d="M7.646.146a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8.5 1.707V5.5a.5.5 0 01-1 0V1.707L6.354 2.854a.5.5 0 11-.708-.708l2-2zM8 10a.5.5 0 01.5.5v3.793l1.146-1.147a.5.5 0 01.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L7.5 14.293V10.5A.5.5 0 018 10zM.146 8.354a.5.5 0 010-.708l2-2a.5.5 0 11.708.708L1.707 7.5H5.5a.5.5 0 010 1H1.707l1.147 1.146a.5.5 0 01-.708.708l-2-2zM10 8a.5.5 0 01.5-.5h3.793l-1.147-1.146a.5.5 0 01.708-.708l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L14.293 8.5H10.5A.5.5 0 0110 8z"
                    />
                </svg>
            </TopButton>
            <MiddleButton
                onClick={() => {
                    handleClick(1);
                }}
                selected={selected === 1}
                // hide rotate button for lights
                style={{
                    display: LIGHT_TYPES.includes(selectedObject.objRef?.type)
                        ? "none"
                        : "block",
                }}
            >
                <svg
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="2.2em"
                    width="2.2em"
                >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M20 11A8.1 8.1 0 004.5 9M4 5v4h4M4 13a8.1 8.1 0 0015.5 2m.5 4v-4h-4" />
                    <path d="M13 12 A1 1 0 0 1 12 13 A1 1 0 0 1 11 12 A1 1 0 0 1 13 12 z" />
                </svg>
            </MiddleButton>
            <BottomButton
                onClick={() => {
                    handleClick(2);
                }}
                selected={selected === 2}
                // hide scale button for lights
                style={{
                    display: LIGHT_TYPES.includes(selectedObject.objRef?.type)
                        ? "none"
                        : "block",
                }}
            >
                <svg viewBox="0 0 64 64" fill="white" height="2em" width="2em">
                    <path
                        fill="none"
                        stroke="white"
                        strokeWidth={4}
                        d="M1 28V1h62v62H36"
                    />
                    <path
                        fill="white"
                        stroke="white"
                        strokeWidth={4}
                        d="M1 33h30v30H1z"
                    />
                    <path
                        fill="none"
                        stroke="white"
                        strokeLinejoin="bevel"
                        strokeWidth={4}
                        d="M57 20V9H46"
                    />
                    <path fill="none" stroke="white" strokeWidth={4} d="M57 9L41 25" />
                </svg>
            </BottomButton>
        </div>
    );
};
