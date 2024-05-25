import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <OrbitControls />
        <Stats />
        {children}
      </Canvas>
    </div>
  );
}
