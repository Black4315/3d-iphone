import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function IPhone({ item, ...props }) {
  const { nodes, materials } = useGLTF('/models/scene.glb');

  // Load texture once
  const texture = useMemo(() => new THREE.TextureLoader().load(item.img), [item.img]);

  // List of materials that can be colored
  const editableMaterials = useMemo(() => {
    const excluded = [
      'zFdeDaGNRwzccye',
      'ujsvqBWRMnqdwPx',
      'hUlRcbieVuIiOXG',
      'jlzuBkUzuJqgiAK',
      'xNrofRCqOXXHVZt'
    ];
    return Object.keys(materials).filter(name => !excluded.includes(name));
  }, [materials]);

  // Apply new color to materials
  useEffect(() => {
    editableMaterials.forEach(name => {
      materials[name].color = new THREE.Color(item.color[0]);
      materials[name].needsUpdate = true;
    });
  }, [item.color, editableMaterials, materials]);

  return (
    <group {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (!node.geometry) return null;

        // Handle the one with custom texture
        if (key === 'xXDHkMplTIDAXLN') {
          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              scale={0.01}
            >
              <meshStandardMaterial map={texture} roughness={1} />
            </mesh>
          );
        }

        const matName = node.material?.name;
        return (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={materials[matName]}
            scale={0.01}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload('/models/scene.glb');

export default IPhone;
