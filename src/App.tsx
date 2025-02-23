import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Home.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store/useTimerStore.ts'; // Import `persistor`
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  </StrictMode>
);