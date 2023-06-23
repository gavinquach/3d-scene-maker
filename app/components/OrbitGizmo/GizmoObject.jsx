/* eslint-disable react/display-name */

import { BackSide } from "three";
import { forwardRef, memo } from "react";
import { Text } from "@react-three/drei";
import { gsap } from "gsap";

const GizmoObject = forwardRef(({ camera, controls, ...props }, ref) => {
    const handleHover = (e, bool) => {
        e.object.color = bool ? "#ddd" : "#555";
    };

    const handleClick = (axis) => {
        let pos;

        if (axis === "x") {
            if (camera.position.x === -8) {
                pos = [8, 0, 0];
            } else {
                pos = [-8, 0, 0];
            }
        }
        else if (axis === "y") {
            if (camera.position.y === 8) {
                console.log('called 1');
                pos = [0, -8, 0];
            } else {
                console.log('called 2');
                pos = [0, 8, 0];
            }
        }
        else if (axis === "z") {
            if (camera.position.z === -8) {
                pos = [0, 0, 8];
            } else {
                pos = [0, 0, -8];
            }
        }

        gsap.to(camera.position, {
            x: pos[0],
            y: pos[1],
            z: pos[2],
            ease: "power1.inOut",
            duration: 0.3,
        });

        gsap.to(controls.target, {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.inOut",
            duration: 0.3,
        });
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
                    onClick={() => handleClick("y")}
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
                    onClick={() => handleClick("x")}
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
                    onClick={() => handleClick("z")}
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

export default memo(GizmoObject);
