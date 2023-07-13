import { useControls } from "leva";

const useControlParams = () => {
    const { envIntensity } = useControls(
        "Lighting",
        {
            envIntensity: {
                value: 0.5,
                min: 0,
                max: 2,
                step: 0.01,
                label: "light intensity",
            },
        },
        { collapsed: true }
    );

    return {
        envIntensity,
    };
};

export default useControlParams;
