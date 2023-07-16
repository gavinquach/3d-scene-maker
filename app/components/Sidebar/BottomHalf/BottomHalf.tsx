import dynamic from "next/dynamic";
import React, { useState } from "react";
import {
    BottomHalfButtonSection,
    BottomHalfButtons,
    BottomHalfObjectCategoryButton,
    BottomHalfPropertiesSection,
    BottomHalfStyled,
} from "./BottomHalfStyled.ts";
import { Settings } from "../Settings/Settings.tsx";
import { Project } from "../Project/Project.tsx";

const Properties = dynamic(
    () => import("../Properties/Properties.tsx").then((mod) => mod.Properties),
    { ssr: true }
);

export const BottomHalf: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<number>(0);
    const [section, setSection] = useState<number>(0);
    const [objectCategory, setObjectCategory] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const handleSelectSection = (num: number) => {
        setSelectedSection(num);
        setSection(num);
    };

    const handleSelectCategory = (num: number) => {
        setObjectCategory(num);
        setSelectedCategory(num);
    };

    return (
        <BottomHalfStyled>
            <BottomHalfButtonSection>
                <BottomHalfButtons
                    selected={selectedSection === 0}
                    onClick={() => handleSelectSection(0)}
                >
                    <svg viewBox="0 0 24 24" fill="white" height="1.8rem" width="1.8rem">
                        <path d="M21.512 6.112l-3.89 3.889-3.535-3.536 3.889-3.889a6.501 6.501 0 00-8.484 8.486l-6.276 6.275a.999.999 0 000 1.414l2.122 2.122a.999.999 0 001.414 0l6.275-6.276a6.501 6.501 0 007.071-1.414 6.504 6.504 0 001.414-7.071z" />
                    </svg>
                </BottomHalfButtons>
                <BottomHalfButtons
                    selected={selectedSection === 1}
                    onClick={() => handleSelectSection(1)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1.8rem"
                        width="1.8rem"
                    >
                        <path d="M18 2v4H6V2h12m1 9a1 1 0 001-1 1 1 0 00-1-1 1 1 0 00-1 1 1 1 0 001 1m-3 7v-5H8v5h8m3-11a3 3 0 013 3v6h-4v4H6v-4H2v-6a3 3 0 013-3h14m-4 17v-2h2v2h-2m-4 0v-2h2v2h-2m-4 0v-2h2v2H7z" />
                    </svg>
                </BottomHalfButtons>
                <BottomHalfButtons
                    selected={selectedSection === 2}
                    onClick={() => handleSelectSection(2)}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1.8rem"
                        width="1.8rem"
                    >
                        <path d="M512.5 390.6c-29.9 0-57.9 11.6-79.1 32.8-21.1 21.2-32.8 49.2-32.8 79.1 0 29.9 11.7 57.9 32.8 79.1 21.2 21.1 49.2 32.8 79.1 32.8 29.9 0 57.9-11.7 79.1-32.8 21.1-21.2 32.8-49.2 32.8-79.1 0-29.9-11.7-57.9-32.8-79.1a110.96 110.96 0 00-79.1-32.8zm412.3 235.5l-65.4-55.9c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.4-55.9a32.03 32.03 0 009.3-35.2l-.9-2.6a442.5 442.5 0 00-79.6-137.7l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.2 28.9c-30-24.6-63.4-44-99.6-57.5l-15.7-84.9a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52-9.4-106.8-9.4-158.8 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.3a353.44 353.44 0 00-98.9 57.3l-81.8-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a445.93 445.93 0 00-79.6 137.7l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.2 56.5c-3.1 18.8-4.6 38-4.6 57 0 19.2 1.5 38.4 4.6 57l-66 56.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.3 44.8 96.8 79.6 137.7l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.8-29.1c29.8 24.5 63 43.9 98.9 57.3l15.8 85.3a32.05 32.05 0 0025.8 25.7l2.7.5a448.27 448.27 0 00158.8 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l.9-2.6c4.3-12.4.6-26.3-9.5-35zm-412.3 52.2c-97.1 0-175.8-78.7-175.8-175.8s78.7-175.8 175.8-175.8 175.8 78.7 175.8 175.8-78.7 175.8-175.8 175.8z" />
                    </svg>
                </BottomHalfButtons>
            </BottomHalfButtonSection>

            <BottomHalfPropertiesSection>
                {section === 0 && (
                    <>
                        <BottomHalfObjectCategoryButton
                            selected={objectCategory === 0}
                            onClick={() => setObjectCategory(0)}
                        >
                            OBJECT
                        </BottomHalfObjectCategoryButton>
                        <BottomHalfObjectCategoryButton
                            selected={objectCategory === 1}
                            onClick={() => setObjectCategory(1)}
                        >
                            GEOMETRY
                        </BottomHalfObjectCategoryButton>
                        <BottomHalfObjectCategoryButton
                            selected={objectCategory === 2}
                            onClick={() => setObjectCategory(2)}
                        >
                            MATERIAL
                        </BottomHalfObjectCategoryButton>
                        <Properties objectCategory={objectCategory} />
                    </>
                )}
                {section === 1 && <Project />}
                {section === 2 && <Settings />}
            </BottomHalfPropertiesSection>
        </BottomHalfStyled>
    );
};
