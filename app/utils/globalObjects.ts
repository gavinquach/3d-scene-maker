import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three-stdlib";

const globalObject: {
  canGenerate: boolean;
  isNotImport: boolean;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  controls: OrbitControls | null;
  renderer: WebGLRenderer | null;
} = {
  canGenerate: true,
  isNotImport: true,
  scene: null,
  camera: null,
  controls: null,
  renderer: null,
};

export default globalObject;
