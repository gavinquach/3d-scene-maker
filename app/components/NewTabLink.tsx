import { MouseEvent, ReactNode, memo } from "react";

const NewTabLink = ({ href, children }: { href: string; children: ReactNode }) => {
    const handleClick: (e: MouseEvent<HTMLAnchorElement>) => void = (
        e: MouseEvent<HTMLAnchorElement>
    ): void => {
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
