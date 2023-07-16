interface IButton {
    children: React.ReactNode;
    [x: string]: any;
}

interface ITransforms {
    x: number;
    y: number;
    z: number;
}

interface ITransformsString {
    x: string;
    y: string;
    z: string;
}

interface IDirectionalLightObject {
    category: "light",
    name: string,
    type: "DirectionalLight",
    transforms: {
        position: ITransforms,
    },
    properties: {
        color: string,
        intensity: number,
        castShadow: boolean,
        target: ITransforms,
    },
}

interface IPointLightObject {
    category: "light",
    name: string,
    type: "PointLight",
    transforms: {
        position: ITransforms,
    },
    properties: {
        color: string,
        decay: number,
        distance: number,
        intensity: number,
        castShadow: boolean,
    },
}

interface ISpotLightObject {
    category: "light",
    name: string,
    type: "SpotLight",
    transforms: {
        position: ITransforms,
    },
    properties: {
        color: string,
        intensity: number,
        distance: number,
        angle: number,
        penumbra: number,
        decay: number,
        castShadow: boolean,
        target: ITransforms,
        isSpotLight: boolean,
    },
}

interface IMeshObject {
    category: "light",
    name: string,
    type: string,
    transforms: {
        position: ITransforms,
        rotation: ITransforms,
        scale: ITransforms,
    },
    properties: {
        intensity: number,
        castShadow: boolean,
        receiveShadow: boolean,
        visible: boolean,
        frustumCulled: boolean,
        renderOrder: number,
    },
}
