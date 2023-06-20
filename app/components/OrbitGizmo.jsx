/* eslint-disable react/display-name */

import { BackSide, Matrix4 } from "three";
import { forwardRef, memo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Hud, OrthographicCamera, Text } from "@react-three/drei";

const GizmoObject = forwardRef((props, ref) => {
    const handleHover = (e, bool) => {
        e.object.color = bool ? "#ddd" : "#555";
    };

    return (
        <group ref={ref} {...props} dispose={null}>
            <group name="Y_Axis">
                <mesh position={[0, 25, 0]}>
                    <cylinderGeometry args={[2, 2, 50, 32]} />
                    <meshBasicMaterial color="#78bd00" />
                </mesh>
                <mesh position={[0, 65, 0]}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#78bd00" side={BackSide} />
                </mesh>
            </group>
            <group name="X_Axis">
                <mesh position={[-25, 0, 0]} rotation={[0, 0, Math.PI * 0.5]}>
                    <cylinderGeometry args={[2, 2, 50, 32]} />
                    <meshBasicMaterial color="#b73246" />
                </mesh>
                <mesh position={[-65, 0, 0]}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#b73246" side={BackSide} />
                </mesh>
            </group>
            <group name="Z_Axis">
                <mesh position={[0, 0, -25]} rotation={[Math.PI * 0.5, 0, 0]}>
                    <cylinderGeometry args={[2, 2, 50, 32]} />
                    <meshBasicMaterial color="#2967ae" />
                </mesh>
                <mesh position={[0, 0, -65]}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#2967ae" side={BackSide} />
                </mesh>
            </group>

            <group name="Axis_Text">
                <Text
                    name="Text_Y"
                    onPointerEnter={(e) => handleHover(e, true)}
                    onPointerLeave={(e) => handleHover(e, false)}
                    color="#555"
                    characters="Y"
                    scale={22}
                    position={[0, 63, 0]}
                >
                    Y
                </Text>
                <Text
                    name="Text_X"
                    onPointerEnter={(e) => handleHover(e, true)}
                    onPointerLeave={(e) => handleHover(e, false)}
                    color="#555"
                    characters="X"
                    scale={22}
                    position={[-65, 0, 0]}
                >
                    X
                </Text>
                <Text
                    name="Text_Z"
                    onPointerEnter={(e) => handleHover(e, true)}
                    onPointerLeave={(e) => handleHover(e, false)}
                    color="#555"
                    characters="Z"
                    scale={22}
                    position={[0, 0, -65]}
                    rotation={[0, Math.PI, 0]}
                >
                    Z
                </Text>
            </group>
        </group>
    );
});

const OrbitGizmo = ({ renderPriority = 2, matrix = new Matrix4() }) => {
    const mesh = useRef(null);
    const camera = useThree((state) => state.camera);
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
        <Hud renderPriority={renderPriority}>
            <OrthographicCamera makeDefault position={[0, 0, 100]} zoom={0.8} />
            <GizmoObject
                ref={mesh}
                position={[size.width / 2 - 300, size.height / 2 - 20, 0]}
            />
        </Hud>
    );
};

export default memo(OrbitGizmo);
