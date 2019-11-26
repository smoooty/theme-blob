import React, { useMemo, useContext, useEffect, useRef } from 'react';
import {
  TextureLoader,
  SphericalReflectionMapping,
  NearestFilter,
  LinearMipMapLinearFilter,
  MixOperation,
  AddOperation,
  Vector2,
} from 'three';
import { useLoader, useThree, useFrame } from 'react-three-fiber';
import { ThemeContext } from 'styled-components';
import envUrl from './assets/Abstract5.png';
import normalUrl from './assets/NormalMap.png';
import * as noise from './perlin';

export default function Blob() {
  const theme = useContext(ThemeContext);
  const blob = useRef();
  const [env, normal] = useLoader(TextureLoader, [envUrl, normalUrl]);
  useMemo(() => {
    env.mapping = SphericalReflectionMapping;
    env.magFilter = NearestFilter;
    env.minFilter = LinearMipMapLinearFilter;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { gl, clock } = useThree();
  useEffect(() => {
    gl.setClearColor(theme.color, 1);
  }, [gl, theme]);

  useFrame(() => {
    const time = clock.getElapsedTime();
    const position = {
      x: 1,
      y: 0.5,
    };
    function deformGeometry(time, position) {
      var k = 1.5;
      let x = position.x / 600;
      let y = position.y < 200 ? 3 : Math.abs(position.y / 100);

      for (var i = 0; i < blob.current.geometry.vertices.length; i++) {
        var p = blob.current.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + 0.3 * noise.noise.perlin3(p.x * k * x + time, p.y * k * y + time, p.z * k));
      }
    }

    deformGeometry(time, position);
    blob.current.geometry.verticesNeedUpdate = true;
    blob.current.geometry.computeVertexNormals();
    blob.current.geometry.normalsNeedUpdate = true;
    blob.current.rotation.x += 0.00001 / time;
    blob.current.rotation.z += 0.000001 / time;
  });

  return (
    <mesh ref={blob} visible castShadow={true} receiveShadow={true} scale={[5, 5, 5]}>
      <sphereGeometry attach="geometry" args={[1, 128, 128]} />
      <meshPhongMaterial
        attach="material"
        color={theme.color}
        transparent
        envMap={env}
        normalMap={normal}
        normalScale={new Vector2(0.4, 0.1)}
        combine={AddOperation}
        reflectivity={0.9}
        shininess={100}
        specular={0xffffff}
      />
    </mesh>
  );
}
