import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Scene from './Blob/Scene';

const Main = styled.main`
  height: 90vh;
  color: ${({ theme }) => theme.color};
`;

const themes = {
  light: {
    color: '#ffffff',
  },
  dark: {
    color: '#000000',
  },
  red: {
    color: '#f5222d',
  },
  cyan: {
    color: '#20c0e7',
  },
};

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeProvider theme={themes[theme]}>
      <Main>
        some stuff
        <button onClick={() => setTheme('dark')}>dark</button>
        <button onClick={() => setTheme('light')}>light</button>
        <button onClick={() => setTheme('red')}>red</button>
        <button onClick={() => setTheme('cyan')}>cyan</button>
        <Scene />
      </Main>
    </ThemeProvider>
  );
}

export default App;
