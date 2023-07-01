import { useControls } from "leva";

import useStore from "../../utils/store.js";

const useControlParams = () => {
    const selectedObject = useStore((state) => state.selectedObject);
    const objectTransforms = useStore((state) => state.objectTransforms);

    const [{ position, rotation, scale }, setLevaTransforms] =
        useControls(() => ({
            position: {
                x: objectTransforms[selectedObject.name]?.position?.x || 0,
                y: objectTransforms[selectedObject.name]?.position?.y || 0,
                z: objectTransforms[selectedObject.name]?.position?.z || 0,
            },
            rotation: {
                x: objectTransforms[selectedObject.name]?.rotation?.x || 0,
                y: objectTransforms[selectedObject.name]?.rotation?.y || 0,
                z: objectTransforms[selectedObject.name]?.rotation?.z || 0,
            },
            scale: {
                x: objectTransforms[selectedObject.name]?.scale?.x || 1,
                y: objectTransforms[selectedObject.name]?.scale?.y || 1,
                z: objectTransforms[selectedObject.name]?.scale?.z || 1,
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
