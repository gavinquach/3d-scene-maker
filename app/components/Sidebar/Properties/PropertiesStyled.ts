import styled from "styled-components";

export const PropertiesTableContainer = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
`;

export const PropertiesTableLeftColumn = styled.div`
  /* Styles for the left column */
  margin-bottom: 0.5rem;
`;

export const PropertiesTableRightColumn = styled.div`
  /* Styles for the right column */
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(0, 1fr)
  ); /* Split into smaller columns */
  gap: 0.5rem;
  user-select: all;
`;

export const PropertiesTableRightColumnItem = styled.div`
  /* Styles for each smaller column */
`;

export const PropertiesNumberInput = styled.input`
  background: #f5f5f5;
  color: #000;
  width: 100%;
  margin: 0;
  border: none;
  outline: none;
  text-align: right;
  cursor: n-resize;

  /* Hide the spinner arrows */
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:active {
    cursor: none;
  }
`;

export const PropertiesSelect = styled.select`
  width: 100%;
  font-size: 1.25rem;
  color: #000;
`;

export const PropertiesOption = styled.option`
  color: #000;
  font-size: 1rem;
`;

export const PropertiesCheckBoxInput = styled.input`
  width: 50%;
  height: 50%;
  margin: 1rem 0;
`;

export const PropertiesRangeInputContainer = styled.div`
  display: flex;
`;
export const PropertiesRangeInput = styled.input`
  flex-grow: 1;
  margin-right: 0.5rem;
`;
export const PropertiesNumericBox = styled.input`
  display: block;
  width: 2.7rem;
  height: 2.7rem;
  font-size: 1.1rem;
  border-radius: 0.2rem;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
`;
