import { memo } from "react";
import { Leva } from "leva";

const ControlMenu = (props) => (
    <span onClick={(e) => e.stopPropagation()}>
        <Leva {...props} />
    </span>
);

export default memo(ControlMenu);
