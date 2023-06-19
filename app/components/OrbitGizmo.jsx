import { Matrix4 } from 'three';
import { memo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Hud, OrthographicCamera } from '@react-three/drei';

const OrbitGizmo = ({ renderPriority = 2, matrix = new Matrix4() }) => {
    const mesh = useRef(null);
    const camera = useThree((state) => state.camera);
    const size = useThree((state) => state.size);
    const [hovered, hover] = useState(null);

    useFrame(() => {
        // Spin mesh to the inverse of the default cameras matrix
        matrix.copy(camera.matrix).invert();
        mesh.current.quaternion.setFromRotationMatrix(matrix);
    });

    return (
        <Hud renderPriority={renderPriority}>
            <OrthographicCamera makeDefault position={[0, 0, 100]} zoom={0.8} />
            <mesh
                ref={mesh}
                position={[size.width / 2 - 300, size.height / 2, 0]}
                onPointerOut={() => hover(null)}
                onPointerMove={(e) => hover(e.face.materialIndex)}>
                {[...Array(6)].map((_, index) => (
                    <meshLambertMaterial attach={`material-${index}`} key={index} color={hovered === index ? 'orange' : 'hotpink'} />
                ))}
                <boxGeometry args={[80, 80, 80]} />
            </mesh>
            <ambientLight intensity={1} />
            <pointLight position={[200, 200, 100]} intensity={1} />
        </Hud>
    );
}

export default memo(OrbitGizmo);
