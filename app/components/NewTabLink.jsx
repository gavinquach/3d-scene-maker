import { memo } from "react";

const NewTabLink = ({ href, children }) => {
    const handleClick = (e) => {
        e.preventDefault();
        window.open(href, "_blank");
    };

    return (
        <a href={href} onClick={handleClick}>
            {children}
        </a>
    );
};

export default memo(NewTabLink);
