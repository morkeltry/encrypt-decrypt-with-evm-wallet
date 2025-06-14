import type { FunctionComponent, ReactNode } from 'react';
import { useState, useContext } from 'react';
import styled from 'styled-components';

import nacl from "tweetnacl";
import { encodeBase64, decodeUTF8 } from "tweetnacl-util";

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
  const [secretKey, setSecretKey] = useState<Uint8Array>(() => nacl.randomBytes(nacl.secretbox.keyLength));

  console.log(`SECRET KEY=${secretKey}`);
    
  const handleFiles = async (files: File[]) => {
    const file = files[0];
    const arrayBuffer = await file.arrayBuffer();
    const fileUint8 = new Uint8Array(arrayBuffer);

    // Generate a random nonce for this encryption
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);

    // Encrypt the file
    const encrypted = nacl.secretbox(fileUint8, nonce, secretKey);

    // For storage or transmission, encode nonce and encrypted data as base64
    const encryptedBase64 = encodeBase64(encrypted);
    const nonceBase64 = encodeBase64(nonce);

    // Example: Save or send { encryptedBase64, nonceBase64 }
    console.log({ encryptedBase64, nonceBase64 });
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        <h2>Upload Your File</h2>
        <FileUploader onFilesSelected={handleFiles} />
        Secret key: {secretKey}
        {children}
        <Footer />
      </Wrapper>
    </>
  );
};
