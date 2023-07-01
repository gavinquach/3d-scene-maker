import { DRACOLoader, KTX2Loader } from "three-stdlib";
import { REVISION } from "three";

// export const API_URL = 'http://localhost:3000/api';
export const TRANSFORMS_FILE_NAME = "objectTransforms.json";
export const EXPORT_FILE_NAME = "sceneData";

const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
export const DRACO_LOADER = new DRACOLoader().setDecoderPath(
    `${THREE_PATH}/examples/jsm/libs/draco/gltf/`
);
export const KTX2_LOADER = new KTX2Loader().setTranscoderPath(
    `${THREE_PATH}/examples/jsm/libs/basis/`
);
