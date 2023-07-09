import styled from "styled-components";

export const ViewportShadingSelectorWrapperStyled = styled.div`
  display: flex;
  position: absolute;
  right: 21.5%;
  top: 4.5%;
  height: 2rem;
  width: 8rem;
  z-index: 10;
`;

export const ButtonStyled = styled.button<IShelfButton>`
  height: 2.2rem;
  width: 3rem;
  cursor: default;
  padding: 0.25rem 0.5rem;
  outline: 1px solid #4b5563;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  user-select: none;
  background-color: ${({ selected }) => (selected ? "#152f6e" : "#2d3748")};
  border-radius: ${({ side }) =>
        side === "left"
            ? "0.3rem 0 0 0.3rem"
            : side === "right"
                ? "0 0.3rem 0.3rem 0"
                : "0"};
  &:hover {
    background-color: #4a5568;
  }
`;
