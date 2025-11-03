import React, { Suspense, useRef, type FC } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import * as THREE from 'three';

const ObjWithTextures: FC = () => {
   // Load OBJ từ public folder
   const obj = useLoader(OBJLoader, '/models/base/base.obj') as THREE.Group;

   // Load tất cả texture
   const [diffuse, normal, roughness, metallic] = useTexture([
      '/models/base/texture_diffuse.png',
      '/models/base/texture_normal.png',
      '/models/base/texture_roughness.png',
      '/models/base/texture_metallic.png',
   ]);

   const meshRef = useRef<THREE.Group | null>(null);

   // Xoay nhẹ mesh
   useFrame(({ clock }) => {
      if (meshRef.current) {
         const t = clock.getElapsedTime();
         meshRef.current.rotation.y = t * 0.2;
         meshRef.current.position.y = Math.sin(t * 2) * 0.2;
      }
   });

   // Áp texture lên tất cả mesh con
   obj.traverse((child: any) => {
      if (child.isMesh) {
         child.material = new THREE.MeshStandardMaterial({
            map: diffuse,
            normalMap: normal,
            roughnessMap: roughness,
            metalnessMap: metallic,
            transparent: true,
            side: THREE.DoubleSide, // hiển thị cả hai mặt
         });
      }
   });

   return <primitive ref={meshRef} object={obj} scale={2} />;
};

const Cheppy = () => (
   <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to top, #87ceeb, #ffffff)' }}>
      <Suspense fallback={<div>Loading 3D model...</div>}>
         <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <ObjWithTextures />
            <OrbitControls enableZoom />
         </Canvas>
      </Suspense>
   </div>
);

export default Cheppy;
