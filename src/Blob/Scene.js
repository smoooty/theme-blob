import React, { Suspense, useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame, extend } from 'react-three-fiber';
import Lights from './Lights';
import Blob from './oldBlob';
import Text from './Text';
import { ThemeContext, ThemeProvider } from 'styled-components';
import { apply as applySpring, useSpring, a, interpolate } from 'react-spring/three';

import { EffectComposer } from './postprocessing/EffectComposer';
import { RenderPass } from './postprocessing/RenderPass';
import { GlitchPass } from './postprocessing/GlitchPass';
import { WaterPass } from './postprocessing/WaterPass';

extend({ EffectComposer, RenderPass, GlitchPass, WaterPass });
applySpring({ EffectComposer, RenderPass, GlitchPass, WaterPass });

/** This component creates a glitch effect */
const Effects = React.memo(({ factor }) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
  // This takes over as the main render-loop (when 2nd arg is set to true)
  useFrame(() => composer.current.render(), true);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <a.waterPass attachArray="passes" factor={1} />
      <a.waterPass attachArray="passes" renderToScreen factor={factor} />
    </effectComposer>
  );
});

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
        {/* <Effects factor={2} /> */}
        <Text>
          Such verdicts are crimes against truth. The Law is a lie, and through it men lie most shamelessly. For
          instance, a disgraced woman, forsaken and spat upon by kith and kin, doses herself and her baby with laudanum.
          The baby dies; but she pulls through after a few weeks in hospital, is charged with murder, convicted, and
          sentenced to ten years' penal servitude. Recovering, the Law holds her responsible for her actions; yet, had
          she died, the same Law would have rendered a verdict of temporary insanity.
        </Text>
        {/* <Suspense fallback={null}>
          <Blob />
        </Suspense> */}
        <Lights />
      </ThemeProvider>
    </Canvas>
  );
}
