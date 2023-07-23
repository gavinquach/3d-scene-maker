import dynamic from "next/dynamic";
import useStore from "@/app/utils/store.js";

const DirectionalLightProperties = dynamic(() =>
    import("./DirectionalLightProperties.tsx").then(
        (mod) => mod.DirectionalLightProperties
    )
);

const PointLightProperties = dynamic(() =>
    import("./PointLightProperties.tsx").then((mod) => mod.PointLightProperties)
);

const SpotLightProperties = dynamic(() =>
    import("./SpotLightProperties.tsx").then((mod) => mod.SpotLightProperties)
);

export const LightProperties: React.FC = () => {
    const selectedObject = useStore((state) => state.selectedObject);
    return (
        <>
            {selectedObject.object.type === "DirectionalLight" && (
                <DirectionalLightProperties
                    name={selectedObject.name}
                    object={selectedObject.objRef}
                />
            )}
            {selectedObject.object.type === "SpotLight" && (
                <SpotLightProperties
                    name={selectedObject.name}
                    object={selectedObject.objRef}
                />
            )}
            {selectedObject.object.type === "PointLight" && (
                <PointLightProperties
                    name={selectedObject.name}
                    object={selectedObject.objRef}
                />
            )}
        </>
    );
};
