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
interface IObject3DObject {
    category: string;
    name: string;
    type: string;
    transforms: {
        position: ITransforms,
    };
    properties: {
        castShadow: boolean,
        visible: boolean,
        frustumCulled: boolean,
        renderOrder: number,
    };
}
interface ILightObject extends IObject3DObject {
    category: "light";
    type: "DirectionalLight" | "PointLight" | "SpotLight";
    helper: any;
    properties: IObject3DObject["properties"] & {
        color: string,
        intensity: number,
        shadowBias: number,
        shadowNormalBias: number,
    };
}
interface IDirectionalLightObject extends ILightObject {
    properties: ILightObject["properties"] & {
        target: ITransforms,
    };
}
interface IPointLightObject extends ILightObject {
    type: "PointLight";
    properties: ILightObject["properties"] & {
        decay: number,
        distance: number,
    };
}
interface ISpotLightObject extends ILightObject {
    type: "SpotLight";
    properties: ILightObject["properties"] & {
        angle: number,
        decay: number,
        distance: number,
        penumbra: number,
        target: ITransforms,
    };
}
interface IMeshObject extends IObject3DObject {
    category: string;
    type: "Mesh";
    transforms: IObject3DObject["properties"] & {
        rotation: ITransforms,
        scale: ITransforms,
    };
    properties: IObject3DObject["properties"] & {
        receiveShadow: boolean,
    };
}
