import React, { Suspense, useContext, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from 'react-three-fiber';
import Lights from './Lights';
import Blob from './oldBlob';
import { ThemeContext, ThemeProvider } from 'styled-components';

export default function Scene() {
  const theme = useContext(ThemeContext);

  return (
    <Canvas
      camera={{
        fov: 40,
        near: 2,
        far: 2000,
        position: [0, 1, 20],
      }}
      pixelRatio={window.devicePixelRatio}
      onCreated={({ gl }) => (
        gl.setClearColor(theme.color, 1),
        (gl.shadowMap.enabled = true),
        (gl.gammaInput = true),
        (gl.gammaOutput = true),
        (gl.shadowMap.type = THREE.PCFSoftShadowMap)
      )}
    >
      <ThemeProvider theme={theme}>
        <Suspense fallback={null}>
          <Blob />
        </Suspense>
        <Lights />
      </ThemeProvider>
    </Canvas>
  );
}
