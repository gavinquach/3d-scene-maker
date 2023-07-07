import styled from "styled-components";

export const TableRow = styled.div`
  display: flex;
  height: 2.6rem;
`;

export const TableColumn = styled.div`
  flex: 1;
`;

export const TableColumnLeft = styled(TableColumn)`
  min-width: 5rem;
  width: 5rem;
  max-width: 5rem;
  border: 1px solid red;
`;

export const TableColumnRight = styled(TableColumn)`
  border: 1px solid green;
`;
