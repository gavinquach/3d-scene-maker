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
