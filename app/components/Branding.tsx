import { MouseEvent } from "react";
import { styled } from "styled-components";

const BrandingStyled = styled.p`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  cursor: default;

  // disable selection on all platforms
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &:hover {
    cursor: pointer;
  }

  z-index: 1000;
`;

export const Branding = () => {
    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        window.open("https://github.com/gavinquach/", "_blank", "noreferrer");
    };

    return (
        <BrandingStyled onClick={clickHandler}>
            3D Scene Maker (W.I.P) by gavinquach
        </BrandingStyled>
    );
};
