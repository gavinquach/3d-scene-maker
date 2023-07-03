import { useControls } from "leva";

import useStore from "../../utils/store.js";

const useControlParams = () => {
    const selectedObject = useStore((state) => state.selectedObject);

    const [{ position, rotation, scale }, setLevaTransforms] =
        useControls(() => ({
            position: {
                x: selectedObject.object?.transforms?.position?.x || 0,
                y: selectedObject.object?.transforms?.position?.y || 0,
                z: selectedObject.object?.transforms?.position?.z || 0,
            },
            rotation: {
                x: selectedObject.object?.transforms?.rotation?.x || 0,
                y: selectedObject.object?.transforms?.rotation?.y || 0,
                z: selectedObject.object?.transforms?.rotation?.z || 0,
            },
            scale: {
                x: selectedObject.object?.transforms?.scale?.x || 1,
                y: selectedObject.object?.transforms?.scale?.y || 1,
                z: selectedObject.object?.transforms?.scale?.z || 1,
            },
        }));

    const { envIntensity, environment } = useControls(
        "Lighting",
        {
            envIntensity: {
                value: 0.5,
                min: 0,
                max: 2,
                step: 0.01,
                label: "light intensity",
            },
            environment: {
                value: "city",
                options: [
                    "sunset",
                    "dawn",
                    "night",
                    "warehouse",
                    "forest",
                    "apartment",
                    "studio",
                    "city",
                    "park",
                    "lobby",
                ],
            },
        },
        { collapsed: true }
    );

    return {
        envIntensity,
        environment,
        position,
        rotation,
        scale,
        setLevaTransforms,
    };
};

export default useControlParams;
