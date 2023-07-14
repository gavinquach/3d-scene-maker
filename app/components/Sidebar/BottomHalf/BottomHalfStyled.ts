import { ReactNode } from "react";
import { styled } from "styled-components";

interface ISelectionButton {
    children: ReactNode;
    [x: string]: any;
}

export const BottomHalfStyled = styled.div`
    display: flex;
    height: 65%;
    width: 100%;
    background-color: #1f2937;
    border-top: 1px solid #374151;
    border-bottom: 1px solid #374151;
    user-select: none;
`;

export const BottomHalfButtonSection = styled.div`
    display: block;
    flex-basis: 3rem;
    height: 100%;
    background-color: #171c22;
    padding-top: 1.5rem;
`;

export const BottomHalfButtons = styled.button<ISelectionButton>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.8rem;
    width: 2.8rem;
    color: #fff;
    font-size: 1rem;
    cursor: default;
    border: none;
    border-radius: 0.25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    outline: none;
    padding: 0.5rem;
    margin: 0 -0.1rem 0.5rem 0;
    background-color: ${({ selected }) => (selected ? "#1f2937" : "none")};
    &:hover {
        background-color: #323232;
    }
`;

export const BottomHalfPropertiesSection = styled.div`
    flex-grow: 1;
    height: 100%;
    width: 100%;
    background-color: #1f2937;
    padding: 2rem 1rem;
    overflow-y: scroll;
`;
