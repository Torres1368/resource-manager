// src/Scene3D.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { WolfModel } from "./WolfModel";


const Wolf3D = () => {
  return (
    <Canvas style={{ height: "400px", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 1]} />
      <OrbitControls />

      <WolfModel position={[0, -1, 0]} scale={1.5} />
    </Canvas>
  );
};

export default Wolf3D;
