import {
    DRACOLoader,
    GLTFLoader,
    KTX2Loader,
    MeshoptDecoder,
} from "three-stdlib";
import { REVISION, WebGLRenderer } from "three";

// export const API_URL = 'http://localhost:3000/api';
export const SCENE_DATA_FILE_NAME = "data.json";
export const EXPORT_FILE_NAME = "sceneData";

const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
export const DRACO_LOADER = new DRACOLoader().setDecoderPath(
    `${THREE_PATH}/examples/jsm/libs/draco/gltf/`
);
export const KTX2_LOADER = new KTX2Loader().setTranscoderPath(
    `${THREE_PATH}/examples/jsm/libs/basis/`
);

export const GLTF_LOADER = (renderer: WebGLRenderer) =>
    new GLTFLoader()
        .setCrossOrigin("anonymous")
        .setDRACOLoader(DRACO_LOADER)
        .setKTX2Loader(renderer ? KTX2_LOADER : KTX2_LOADER.detectSupport(renderer))
        .setMeshoptDecoder(MeshoptDecoder);

export const ENVMAP_PATH = `/envmaps`;

export const PERFORMANCE_SETTINGS = {
    current: 1,
    min: 0.1,
    max: 1,
    debounce: 200,
};

export const LIGHT_TYPES = ["DirectionalLight", "PointLight", "SpotLight"];

export const ENVMAP_LIST = {
    "none": "",
    "apartment": `${ENVMAP_PATH}/lebombo_1k.hdr`,
    "city": `${ENVMAP_PATH}/potsdamer_platz_1k.hdr`,
    "dawn": `${ENVMAP_PATH}/kiara_1_dawn_1k.hdr`,
    "forest": `${ENVMAP_PATH}/forest_slope_1k.hdr`,
    "lobby": `${ENVMAP_PATH}/st_fagans_interior_1k.hdr`,
    "night": `${ENVMAP_PATH}/dikhololo_night_1k.hdr`,
    "park": `${ENVMAP_PATH}/rooitou_park_1k.hdr`,
    "studio": `${ENVMAP_PATH}/studio_small_03_1k.hdr`,
    "sunset": `${ENVMAP_PATH}/venice_sunset_1k.hdr`,
    "warehouse": `${ENVMAP_PATH}/empty_warehouse_01_1k.hdr`,
};
