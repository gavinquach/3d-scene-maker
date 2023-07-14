import { MouseEvent, ReactNode } from "react";

export const NewTabLink = ({ href, children }: { href: string; children: ReactNode }) => {
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
