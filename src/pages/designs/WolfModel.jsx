import { useGLTF } from "@react-three/drei";

export function WolfModel(props) {
  const wolf = useGLTF("/models3D/wolf/wolf.glb");

  return (
    <primitive object={wolf.scene} {...props} scale={0.5} />
  );
}


useGLTF.preload("/models3D/wolf/wolf.glb");
