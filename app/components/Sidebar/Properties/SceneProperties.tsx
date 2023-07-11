import React from "react";
import useStore from "../../../utils/store.js";
import PropertiesCommon from "./PropertiesCommon.tsx";
import {
    PropertiesHeaderText,
    PropertiesInput,
    PropertiesOption,
    PropertiesSelect,
    PropertiesTableContainer,
    PropertiesTableLeftColumn,
    PropertiesTableRightColumn,
} from "./PropertiesStyled.ts";

export default function SceneProperties(): React.JSX.Element {
    const setEnvironment = useStore((state) => state.setEnvironment);
    const environmentBackground = useStore(
        (state) => state.environmentBackground
    );
    const toggleEnvironmentBackground = useStore(
        (state) => state.toggleEnvironmentBackground
    );

    const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEnvironment(e.target.value);
    };

    return (
        <div>
            <PropertiesHeaderText>Scene Properties</PropertiesHeaderText>
            <PropertiesCommon isScene />

            <PropertiesTableContainer>
                <PropertiesTableLeftColumn>Environment</PropertiesTableLeftColumn>
                <PropertiesTableRightColumn>
                    <PropertiesSelect onChange={handleEnvironmentChange}>
                        <PropertiesOption selected value="">
                            none
                        </PropertiesOption>
                        <PropertiesOption value="apartment">apartment</PropertiesOption>
                        <PropertiesOption value="city">city</PropertiesOption>
                        <PropertiesOption value="dawn">dawn</PropertiesOption>
                        <PropertiesOption value="forest">forest</PropertiesOption>
                        <PropertiesOption value="lobby">lobby</PropertiesOption>
                        <PropertiesOption value="night">night</PropertiesOption>
                        <PropertiesOption value="park">park</PropertiesOption>
                        <PropertiesOption value="studio">studio</PropertiesOption>
                        <PropertiesOption value="sunset">sunset</PropertiesOption>
                        <PropertiesOption value="warehouse">warehouse</PropertiesOption>
                    </PropertiesSelect>
                </PropertiesTableRightColumn>

                <PropertiesTableLeftColumn>
                    Environment Background
                </PropertiesTableLeftColumn>
                <PropertiesTableRightColumn>
                    <PropertiesInput
                        type="checkbox"
                        checked={environmentBackground === true}
                        onChange={toggleEnvironmentBackground}
                    />
                </PropertiesTableRightColumn>
            </PropertiesTableContainer>
        </div>
    );
}
