/* eslint-disable react/display-name */

import { Matrix4 } from "three";
import { memo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Hud, OrthographicCamera } from "@react-three/drei";

import GizmoObject from "./GizmoObject.jsx";

const OrbitGizmo = ({ renderPriority = 2, matrix = new Matrix4(), ...props }) => {
    const mesh = useRef(null);
    const camera = useThree((state) => state.camera);
    const controls = useThree((state) => state.controls);
    const size = useThree((state) => state.size);

    useFrame(() => {
        // Spin mesh to the inverse of the default cameras matrix
        matrix.copy(camera.matrix).invert();
        mesh.current?.quaternion?.setFromRotationMatrix(matrix);

        // Keep text facing the camera
        mesh.current?.children[3]?.children?.forEach((text) => {
            text.quaternion.setFromRotationMatrix(camera.matrix);
        });
    });

    return (
        <Hud renderPriority={renderPriority} {...props} dispose={null}>
            <OrthographicCamera makeDefault position={[-400, -45, 100]} zoom={0.8} />
            <GizmoObject
                ref={mesh}
                position={[size.width / 2 - 300, size.height / 2 - 20, 0]}
                camera={camera}
                controls={controls}
            />
        </Hud>
    );
};

export default memo(OrbitGizmo);
