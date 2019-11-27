import React, { useMemo, useContext } from 'react';
import { useThree } from 'react-three-fiber';
import { ThemeContext } from 'styled-components';

function Text({ children, position, opacity = 1, color = 'white', fontSize = 20 }) {
  const theme = useContext(ThemeContext);
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight },
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 2048;
    const context = canvas.getContext('2d');
    context.font = `bold ${fontSize}px -apple-system, helvetica, segoe ui, sans-serif`;
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    const maxWidth = 400;
    const words = children.split(' ');
    let line = '';
    let y = 25;

    words.map((word, i) => {
      var testLine = line + words[i] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      return testWidth > maxWidth
        ? (context.fillText(line, 1024, 1024 + y), (line = words[i] + ' '), (y += 25))
        : (line = testLine);
    });
    context.fillText(line, 1024, 1024 + y);
    // context.fillText(children, 1024, 1024 - 20 / 2);
    return canvas;
  }, [fontSize, color, children]);
  return (
    <sprite scale={[scale, scale, 1]} position={[0, 0, 0]}>
      <spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture attach="map" image={canvas} premultiplyAlpha onUpdate={s => (s.needsUpdate = true)} />
      </spriteMaterial>
    </sprite>
  );
}

export default Text;
