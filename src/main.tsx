import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/main.css';
import { ManagedUIContext } from './components/ui/context';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ManagedUIContext>
        <App />
      </ManagedUIContext>
    </QueryClientProvider>
  </React.StrictMode>
);
