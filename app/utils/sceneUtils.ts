import globalObject from "./globalObject";
import * as THREE from "three";
import { TransformControls } from "three-stdlib";

// interface SelectableLightHelper extends THREE.Line {
//     selected: boolean;
//     material: THREE.LineBasicMaterial;
// }

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// const intersectObjects: THREE.Object3D[] = [];

// const onMouseClick: (event: MouseEvent) => void = (event: MouseEvent) => {
//     // Calculate normalized device coordinates (NDC) of mouse position
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // Cast a ray from the camera through the mouse position
//     raycaster.setFromCamera(
//         mouse,
//         globalObject.camera as THREE.PerspectiveCamera
//     );

//     // Find intersections with the object
//     const intersects = raycaster.intersectObjects(intersectObjects, true);

//     // Unselect all objects
//     intersectObjects.forEach((obj: THREE.Object3D) => {
//         // Change object's material or any other desired visual feedback
//         (obj as SelectableLightHelper).material.color.set(0xff0000); // For example, resetting the color to red
//     });

//     if (intersects.length > 0) {
//         // Select the clicked object
//         const selectedLightHelper = intersects[0].object as SelectableLightHelper;

//         // Change object's material or any other desired visual feedback
//         selectedLightHelper.material?.color?.set(0x00ff00); // For example, changing the color to green

//         // Perform your desired action with the selected object
//         console.log("Object selected!");
//         console.log(selectedLightHelper);
//     }
// };
// // window.addEventListener("click", onMouseClick, false);

const checkGlobalObject: () => boolean = () => {
    if (globalObject.camera === null) {
        console.error("Camera not found");
        return false;
    }
    if (globalObject.scene === null) {
        console.error("Scene not found");
        return false;
    }
    if (globalObject.renderer === null) {
        console.error("Renderer not found");
        return false;
    }
    return true;
};

// export const addLight: (light: string) => void = (light: string) => {
//     if (!checkGlobalObject()) return;

//     const control = new TransformControls(
//         globalObject.camera as THREE.PerspectiveCamera,
//         globalObject.renderer?.domElement as HTMLCanvasElement
//     );

//     switch (light) {
//         case "directional":
//             const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//             directionalLight.position.set(3, 3, 3);
//             (globalObject.scene as THREE.Scene).add(directionalLight);

//             const directionalLightHelper = new THREE.DirectionalLightHelper(
//                 directionalLight,
//                 1
//             );
//             (globalObject.scene as THREE.Scene).add(directionalLightHelper);

//             control.attach(directionalLight);
//             (globalObject.scene as THREE.Scene).add(control);

//             intersectObjects.push(directionalLightHelper);

//             break;
//         case "hemi":
//             const hemisphereLight = new THREE.HemisphereLight(
//                 0xffffff,
//                 0xffffff,
//                 0.6
//             );
//             hemisphereLight.color.setHSL(0.6, 1, 0.6);
//             hemisphereLight.groundColor.setHSL(0.095, 1, 0.75);
//             hemisphereLight.position.set(0, 10, 0);
//             (globalObject.scene as THREE.Scene).add(hemisphereLight);

//             const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//                 hemisphereLight,
//                 1
//             );
//             (globalObject.scene as THREE.Scene).add(hemisphereLightHelper);

//             control.attach(hemisphereLight);
//             (globalObject.scene as THREE.Scene).add(control);

//             intersectObjects.push(hemisphereLightHelper);

//             break;
//         case "point":
//             const pointLight = new THREE.PointLight(0xffffff, 0.5);
//             pointLight.position.set(3, 3, 3);
//             (globalObject.scene as THREE.Scene).add(pointLight);

//             const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
//             (globalObject.scene as THREE.Scene).add(pointLightHelper);

//             control.attach(pointLight);
//             (globalObject.scene as THREE.Scene).add(control);

//             intersectObjects.push(pointLightHelper);

//             break;
//         case "spot":
//             const spotLight = new THREE.SpotLight(0xffffff, 0.5);
//             spotLight.position.set(3, 3, 3);
//             (globalObject.scene as THREE.Scene).add(spotLight);

//             const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//             (globalObject.scene as THREE.Scene).add(spotLightHelper);

//             control.attach(spotLight);
//             (globalObject.scene as THREE.Scene).add(control);

//             intersectObjects.push(spotLightHelper);

//             break;
//         default:
//             control.dispose();
//             console.error("No light selected");
//             break;
//     }
// };
