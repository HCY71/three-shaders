import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <OrbitControls target={[0, 0, 0]} enableDamping={true} makeDefault />
        <Stats />
        {children}
      </Canvas>
    </div>
  );
}
