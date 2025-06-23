import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box3D() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} /> {/* Cubo de 1x1x1 */}
      <meshStandardMaterial color="tomato" />
    </mesh>
  );
}

const Figura = () => {
  return (
    <Canvas style={{ height: "400px", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 1]} />
      <OrbitControls />
      <Box3D />
    </Canvas>
  );
};

export default Figura;
