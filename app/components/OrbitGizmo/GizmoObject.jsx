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

        switch (axis) {
            case "x":
                pos = [camera.position.x === -8 ? 8 : -8, 0, 0];
                break;
            case "y":
                pos = [0, camera.position.y === 8 ? -8 : 8, 0];
                break;
            case "z":
                pos = [0, 0, camera.position.z === -8 ? 8 : -8];
                break;
            case "-x":
                pos = [camera.position.x === 8 ? -8 : 8, 0, 0];
                break;
            case "-y":
                pos = [0, camera.position.y === -8 ? 8 : -8, 0];
                break;
            case "-z":
                pos = [0, 0, camera.position.z === 8 ? -8 : 8];
                break;
            default:
                pos = [0, 0, 0];
                break;
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
                <mesh position={[0, 65, 0]} onClick={() => handleClick("y")}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#78bd00" side={BackSide} />
                </mesh>
                <mesh position={[0, -65, 0]} onClick={() => handleClick("-y")}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#639c00" side={BackSide} transparent opacity={0.5} />
                </mesh>
            </group>
            <group name="X_Axis">
                <mesh position={[-25, 0, 0]} rotation={[0, 0, Math.PI * 0.5]}>
                    <cylinderGeometry args={[2, 2, 50, 32]} />
                    <meshBasicMaterial color="#b73246" />
                </mesh>
                <mesh position={[-65, 0, 0]} onClick={() => handleClick("x")}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#b73246" side={BackSide} />
                </mesh>
                <mesh position={[65, 0, 0]} onClick={() => handleClick("-x")}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#902737" side={BackSide} transparent opacity={0.5} />
                </mesh>
            </group>
            <group name="Z_Axis">
                <mesh position={[0, 0, -25]} rotation={[Math.PI * 0.5, 0, 0]}>
                    <cylinderGeometry args={[2, 2, 50, 32]} />
                    <meshBasicMaterial color="#2967ae" />
                </mesh>
                <mesh position={[0, 0, -65]} onClick={() => handleClick("z")}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#2967ae" side={BackSide} />
                </mesh>
                <mesh position={[0, 0, 65]} onClick={() => handleClick("-z")}>
                    <sphereGeometry args={[16, 32, 32]} />
                    <meshBasicMaterial color="#215189" side={BackSide} transparent opacity={0.5} />
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
                <Text
                    name="Text_-Y"
                    onPointerEnter={(e) => e.object.visible = true}
                    onPointerLeave={(e) => e.object.visible = false}
                    color="#ddd"
                    scale={22}
                    position={[0, -63, 0]}
                    visible={false}
                >
                    -Y
                </Text>
                <Text
                    name="Text_-X"
                    onPointerEnter={(e) => e.object.visible = true}
                    onPointerLeave={(e) => e.object.visible = false}
                    color="#ddd"
                    scale={22}
                    position={[65, 0, 0]}
                    visible={false}
                >
                    -X
                </Text>
                <Text
                    name="Text_-Z"
                    onPointerEnter={(e) => e.object.visible = true}
                    onPointerLeave={(e) => e.object.visible = false}
                    color="#ddd"
                    scale={22}
                    position={[0, 0, 65]}
                    rotation={[0, Math.PI, 0]}
                    visible={false}
                >
                    -Z
                </Text>
            </group>
        </group>
    );
});

export default memo(GizmoObject);
