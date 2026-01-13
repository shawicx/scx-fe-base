import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('未找到根元素');
}
createRoot(rootElement).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
      <Toaster />
    </ChakraProvider>
  </StrictMode>
);
