import styled from "styled-components";
import InputWithDrag from 'react-input-with-drag';

export const PropertiesTableContainer = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  gap: 1.2rem 0;
  font-size: 1.1rem;
  padding: 0 0.7rem 1.5rem 0.5rem;
  overflow: auto;
  height: auto;
 
  @media (max-width: 2560px) {
    max-height: 55.2vh;
  }
  @media (max-width: 1920px) {
    max-height: 52vh;
  }
  @media (max-width: 1280px) {
    max-height: 45vh;
  }
  @media (max-width: 768px) {
    max-height: 35.5vh;
  }
`;

export const PropertiesTableLeftColumn = styled.div`
  /* Styles for the left column */
  display: flex;
  align-items: center;
`;

export const PropertiesTableRightColumn = styled.div`
  /* Styles for the right column */
  display: grid;
 
  /* Split into smaller columns */
  grid-template-columns: repeat(
    auto-fit,
    minmax(0, 1fr)
  );
  gap: 0.5rem;
  user-select: all;
`;

export const PropertiesTableRightColumnItem = styled.div`
  /* Styles for each smaller column */
  display: flex;
  align-items: center;
`;

export const PropertiesDragNumberInput = styled.input`
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
  font-size: 1.1rem;
  color: #000;
  user-select: none;
`;

export const PropertiesOption = styled.option`
  color: #000;
`;

export const PropertiesCheckBoxInput = styled.input`
  width: 1.2rem;
  height: 1.2rem;
`;

export const PropertiesRangeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const PropertiesRangeInput = styled.input`
  flex-grow: 1;
  margin-right: 0.5rem;
`;

export const PropertiesNumericInput = styled.input`
  width: 4.2rem;
  height: 2.7rem;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
  border: none;
  outline: none;
`;

export const PropertiesNumberInputStandalone = styled.input`
  width: 3.4rem;
  height: 2.7rem;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
  border: none;
  outline: none;
`;

export const PropertiesInputLabel = styled.label`
  font-size: 1.1rem;
  margin-left: 0.6rem;
  user-select: none;
`;

export const InputWithDragStyled = styled(InputWithDrag)`
  color: #000000;
`;