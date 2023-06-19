import { useControls } from "leva";

import useStore from "../../utils/store.js";

const ControlParams = () => {
    const selectedMeshTransforms = useStore((state) => state.selectedMeshTransforms);
    console.log(selectedMeshTransforms);

    const { transformMode, position, rotation, scale } = useControls("Transform mode", {
        transformMode: {
            value: "translate",
            options: ["translate", "rotate", "scale"],
            label: "Transform mode",
        },
        position: {
            value: {
                x: selectedMeshTransforms.position.x,
                y: selectedMeshTransforms.position.y,
                z: selectedMeshTransforms.position.z,
            },
            step: 0.1,
            label: "Location",
        },
        rotation: {
            value: {
                x: selectedMeshTransforms.rotation.x,
                y: selectedMeshTransforms.rotation.y,
                z: selectedMeshTransforms.rotation.z,
            },
            step: 0.1,
            label: "Rotation",
        },
        scale: {
            value: {
                x: selectedMeshTransforms.scale.x,
                y: selectedMeshTransforms.scale.y,
                z: selectedMeshTransforms.scale.z,
            },
            step: 0.1,
            label: "Scale",
        },
    });

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
        position, rotation, scale,
    };
};

export default ControlParams;
