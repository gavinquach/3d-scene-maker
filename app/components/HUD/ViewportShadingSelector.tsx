import { FC, ReactNode, useState } from "react";
import { styled } from "styled-components";

interface IShelfButton {
    children: ReactNode;
    [x: string]: any;
}

const ViewportShadingSelectorWrapperStyled = styled.div`
  display: flex;
  position: absolute;
  right: 21.5%;
  top: 4.5%;
  height: 2rem;
  width: 8rem;
  z-index: 10;
`;

const ButtonStyled = styled.button<IShelfButton>`
  height: 2.2rem;
  width: 3rem;
  cursor: default;
  padding: 0.25rem 0.5rem;
  outline: 1px solid #4b5563;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  user-select: none;
  background-color: ${({ selected }) => (selected ? "#1a438b" : "#2d3748")};
  border-radius: ${({ side }) =>
        side === "left"
            ? "0.3rem 0 0 0.3rem"
            : side === "right"
                ? "0 0.3rem 0.3rem 0"
                : "0"};
  &:hover {
    background-color: #4a5568;
  }
`;

const FarLeftButton: FC<IShelfButton> = ({ children, ...props }) => (
    <ButtonStyled side="left" {...props}>
        {children}
    </ButtonStyled>
);
const MiddleButton: FC<IShelfButton> = ({ children, ...props }) => (
    <ButtonStyled {...props}>{children}</ButtonStyled>
);
const FarRightButton: FC<IShelfButton> = ({ children, ...props }) => (
    <ButtonStyled side="right" {...props}>
        {children}
    </ButtonStyled>
);

const ViewportShadingSelector: () => JSX.Element = () => {
    const [selected, setSelected] = useState<number>(2);

    return (
        <ViewportShadingSelectorWrapperStyled>
            {/* Wireframe Mode */}
            <FarLeftButton selected={selected === 0} onClick={() => setSelected(0)}>
                <svg viewBox="0 0 16 16" fill="white" height="1.25em" width="1.25em">
                    <path
                        fill="white"
                        d="M7.5 1a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm4.244 10c.134-.632.219-1.303.246-2h1.991a6.443 6.443 0 01-.479 2h-1.758zM3.256 6a11.876 11.876 0 00-.246 2H1.019a6.443 6.443 0 01.479-2h1.758zm7.463 0c.15.64.241 1.31.27 2H8V6h2.719zM8 5V2.073c.228.066.454.178.675.334.415.293.813.744 1.149 1.304.233.388.434.819.601 1.289H7.999zM5.176 3.711c.336-.561.734-1.012 1.149-1.304.222-.156.447-.268.675-.334V5H4.574a7.29 7.29 0 01.601-1.289zM7 6v2H4.011c.029-.69.12-1.36.27-2H7zm-5.502 5a6.443 6.443 0 01-.479-2H3.01c.028.697.112 1.368.246 2H1.498zm2.513-2H7v2H4.281c-.15-.64-.241-1.31-.27-2zM7 12v2.927a2.27 2.27 0 01-.675-.334c-.415-.293-.813-.744-1.149-1.304A7.221 7.221 0 014.574 12H7zm2.825 1.289c-.336.561-.734 1.012-1.149 1.304a2.282 2.282 0 01-.675.334V12h2.426c-.168.47-.369.901-.602 1.289zM8 11V9h2.989c-.029.69-.12 1.36-.27 2H8zm3.99-3a11.98 11.98 0 00-.246-2h1.758c.267.639.427 1.309.479 2H11.99zm.989-3h-1.498c-.291-.918-.693-1.723-1.177-2.366a6.462 6.462 0 011.792 1.27c.336.336.631.702.883 1.096zM2.904 3.904a6.492 6.492 0 011.792-1.27C4.213 3.277 3.81 4.082 3.519 5H2.021c.252-.394.547-.761.883-1.096zM2.021 12h1.498c.291.918.693 1.723 1.177 2.366a6.462 6.462 0 01-1.792-1.27A6.505 6.505 0 012.021 12zm10.075 1.096a6.492 6.492 0 01-1.792 1.27c.483-.643.886-1.448 1.177-2.366h1.498a6.466 6.466 0 01-.883 1.096z"
                    />
                </svg>
            </FarLeftButton>

            {/* Solid Mode */}
            <MiddleButton selected={selected === 1} onClick={() => setSelected(1)}>
                <svg fill="white" viewBox="0 0 16 16" height="1.25em" width="1.25em">
                    <path d="M16 8 A8 8 0 0 1 8 16 A8 8 0 0 1 0 8 A8 8 0 0 1 16 8 z" />
                </svg>
            </MiddleButton>

            {/* Material Preview */}
            <MiddleButton selected={selected === 2} onClick={() => setSelected(2)}>
                <svg viewBox="0 0 24 24" height="1.5em" width="1.5em">
                    <path
                        d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"
                        fill="#ffffff"
                    />
                    <path
                        d="M12,4C7.58,4,4,7.58,4,12s3.58,8,8,8s8-3.58,8-8S16.42,4,12,4z M12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S15.31,18,12,18z"
                        fill="#000000"
                    />
                </svg>
            </MiddleButton>

            {/* Render Preview */}
            <FarRightButton selected={selected === 3} onClick={() => setSelected(3)}>
                <svg viewBox="0 0 24 24" height="1.5em" width="1.5em">
                    <path
                        d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"
                        fill="#ffffff"
                    />
                    <path
                        d="M12,4C7.58,4,4,7.58,4,12s3.58,8,8,8s8-3.58,8-8S16.42,4,12,4z M12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S15.31,18,12,18z"
                        fill="#000000"
                    />
                </svg>
            </FarRightButton>
        </ViewportShadingSelectorWrapperStyled>
    );
};

export default ViewportShadingSelector;
