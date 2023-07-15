import { styled } from "styled-components";

export const BottomHalfStyled = styled.div`
    display: flex;
    height: 65vh;
    width: 100%;
    background-color: #1f2937;
    border-top: 1px solid #374151;
    border-bottom: 1px solid #374151;
    user-select: none;
`;

export const BottomHalfHeaderText = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin: 1rem 0 1.4rem 1rem;
`;

export const BottomHalfButtonSection = styled.div`
    display: block;
    flex-basis: 3rem;
    height: 65vh;
    background-color: #171c22;
    padding-top: 1.5rem;
`;

export const BottomHalfButtons = styled.button<IButton>`
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
    height: 65vh;
    width: 100%;
    background-color: #1f2937;
    overflow: hidden;
`;

export const BottomHalfObjectCategoryButton = styled.button<IButton>`
    width: 33.33%;
    height: 3.4rem;
    font-size: 1.3rem;
    background-color: ${({ selected }) => (selected ? "#0e121a" : "#18202b")};
    user-select: none;
    border: none;

    @media (max-width: 1280px) {
        font-size: 1rem;
    }
`;
