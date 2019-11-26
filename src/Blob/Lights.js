import React from "react";

export default function Lights() {
  return (
    <>
      <ambientLight color={0xffffff} intensity={0.3} />
      <directionalLight
        color={0xffeeee}
        intensity={0.1}
        position={[-200, 100, 800]}
        castShadow={true}
        shadowCameraTop={380}
        shadowCameraLeft={-420}
        shadowCameraRight={420}
        shadowCameraBottom={-100}
      />
      <directionalLight
        color={0xffeeee}
        intensity={0.04}
        position={[800, 2000, 800]}
        castShadow={true}
        shadowCameraTop={-380}
      />
    </>
  );
}
