import styled from "styled-components";

export const ButtonStyled = styled.button<IButton>`
  cursor: default;
  height: 4rem;
  width: 4rem;
  background-color: #1f2937;
  padding: 1rem;
  color: white;
  outline: 1px solid #4b5563;
  outline-offset: -1px;
  border-radius: 0.25rem;
  border-top-left-radius: ${({ side }) => (side === "top" ? "0.25rem" : 0)};
  border-top-right-radius: ${({ side }) => (side === "top" ? "0.25rem" : 0)};
  border-bottom-left-radius: ${({ side }) =>
    side === "bottom" ? "0.25rem" : 0};
  border-bottom-right-radius: ${({ side }) =>
    side === "bottom" ? "0.25rem" : 0};

  &:hover {
    background-color: #374151;
  }

  ${({ selected }) => selected && `background-color: #152f6e;`}
`;
