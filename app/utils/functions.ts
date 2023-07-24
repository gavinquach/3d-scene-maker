import { Group, Object3D } from "three";

// Utility function to generate a random string
export const generateRandomString: (length: number) => string = (length) => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const result: string = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result.concat(characters.charAt(randomIndex));
    }
    return result;
};

export const setGLTFEnvIntensity: (
    gltf: Group,
    environmentIntensity: number
) => void = (gltf, environmentIntensity) => {
    gltf.traverse((obj: any) => {
        if (obj.isMesh) {
            obj.material.envMapIntensity = environmentIntensity;
        }
    });
};

export const isObjectMoved: (object: Object3D) => void = (object) => {
    if (!object) return false;
    return (
        object.position.x !== 0 ||
        object.position.y !== 0 ||
        object.position.z !== 0 ||
        object.rotation.x !== 0 ||
        object.rotation.y !== 0 ||
        object.rotation.z !== 0 ||
        object.scale.x !== 1 ||
        object.scale.y !== 1 ||
        object.scale.z !== 1
    );
};
