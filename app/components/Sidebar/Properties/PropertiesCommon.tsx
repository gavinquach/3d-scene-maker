import { memo } from "react";
import {
    TableColumn,
    TableColumnLeft,
    TableColumnRight,
    TableRow,
} from "./PropertiesStyled";
import NumberInput from "./NumberInput";

const PropertiesCommon = ({ isScene = false }) => {
    return (
        <>
            <TableRow>
                <TableColumnLeft>Type</TableColumnLeft>
                <TableColumnRight>Mesh</TableColumnRight>
            </TableRow>
            <TableRow>
                <TableColumnLeft>Name</TableColumnLeft>
                <TableColumnRight>AAAAAAAAA</TableColumnRight>
            </TableRow>
            <TableRow>
                <TableColumnLeft>Position</TableColumnLeft>
                <TableColumnRight><input type="number" /></TableColumnRight>
                <TableColumnRight>AAAAAAAAA</TableColumnRight>
                <TableColumnRight>AAAAAAAAA</TableColumnRight>
            </TableRow>
        </>
    );
};

export default memo(PropertiesCommon);
