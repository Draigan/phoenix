import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./css/index.css"
import store from './redux/store.tsx';
import { Provider } from 'react-redux';
import App from './App.tsx';
import LoadingWrapper from './components/LoadingWrapper.tsx';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <LoadingWrapper>
        <App />
      </LoadingWrapper>
    </StrictMode>
  </Provider>
) 
