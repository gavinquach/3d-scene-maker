import { memo } from "react";
import { TableColumnLeft, TableColumnRight, TableRow } from "./PropertiesStyled";
import NumberInput from "./NumberInput";

const PropertiesCommon = ({ isScene = false }) => {
    return (
        <table>
            <tbody>
                <TableRow>
                    <TableColumnLeft>Type</TableColumnLeft>
                    <TableColumnRight>Mesh</TableColumnRight>
                </TableRow>
                <TableRow>
                    <TableColumnLeft>Name</TableColumnLeft>
                    <TableColumnRight>AAAAAAAA</TableColumnRight>
                </TableRow>
                <TableRow>
                    <TableColumnLeft>Position</TableColumnLeft>
                    <TableColumnRight><NumberInput /></TableColumnRight>
                </TableRow>
            </tbody>
        </table>
    );
};

export default memo(PropertiesCommon);
