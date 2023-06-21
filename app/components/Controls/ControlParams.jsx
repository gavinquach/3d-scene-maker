import { useControls } from "leva";

import useStore from "../../utils/store.js";

const useControlParams = () => {
    const selectedMesh = useStore((state) => state.selectedMesh);
    const meshTransforms = useStore((state) => state.meshTransforms);

    const [{ transformMode, position, rotation, scale }, setLevaTransforms] =
        useControls(() => ({
            transformMode: {
                value: "translate",
                options: ["translate", "rotate", "scale"],
                label: "Transform mode",
            },
            position: {
                x: meshTransforms[selectedMesh?.name]?.position?.x || 0,
                y: meshTransforms[selectedMesh?.name]?.position?.y || 0,
                z: meshTransforms[selectedMesh?.name]?.position?.z || 0,
            },
            rotation: {
                x: meshTransforms[selectedMesh?.name]?.rotation?.x || 0,
                y: meshTransforms[selectedMesh?.name]?.rotation?.y || 0,
                z: meshTransforms[selectedMesh?.name]?.rotation?.z || 0,
            },
            scale: {
                x: meshTransforms[selectedMesh?.name]?.scale?.x || 1,
                y: meshTransforms[selectedMesh?.name]?.scale?.y || 1,
                z: meshTransforms[selectedMesh?.name]?.scale?.z || 1,
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
        transformMode,
        position,
        rotation,
        scale,
        setLevaTransforms,
    };
};

export default useControlParams;
