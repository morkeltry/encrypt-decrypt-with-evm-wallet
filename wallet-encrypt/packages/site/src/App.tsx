import type { FunctionComponent, ReactNode } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import { Footer, Header, FileUploader } from './components';
import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);
  const handleFiles = (files: File[]) => {
    // Handle the files (e.g., upload or encrypt)
    console.log(files);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        <h2>Upload Your File</h2>
        <FileUploader onFilesSelected={handleFiles} />
        {children}
        <Footer />
      </Wrapper>
    </>
  );
};
