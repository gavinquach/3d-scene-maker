import styled from "styled-components";

export const PropertiesHeaderText = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

export const PropertiesTableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.6rem;
`;

export const PropertiesTableLeftColumn = styled.div`
  /* Styles for the left column */
`;

export const PropertiesTableRightColumn = styled.div`
  /* Styles for the right column */
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(0, 1fr)
  ); /* Split into smaller columns */
  gap: 0.5rem;
`;

export const PropertiesTableRightColumnItem = styled.div`
  /* Styles for each smaller column */
`;

export const PropertiesNumberInput = styled.input`
  background: none;
  appearance: textfield;
  -moz-appearance: textfield;
  width: 100%;
  font-size: inherit;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  text-align: center;
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

export const PropertiesInput = styled.input`
  width: 50%;
  height: 50%;
  margin: 1rem 0;
`;
