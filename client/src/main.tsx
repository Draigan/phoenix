import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.tsx'
import "./css/index.css"
import store from './redux/store.tsx';
import { Provider } from 'react-redux';
import SpellingNormal from './screens/SpellingNormal.tsx';
import SpellingWord from './screens/SpellingPractice.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import LoadingWrapper from './components/LoadingWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <LoadingWrapper>
        <Router>
          <Routes>
            <Route path="/app" element={<App />} />
            <Route path="/spellingnormal" element={< SpellingNormal />} />
            <Route path="/" element={< SpellingWord />} />
            <Route path="/settings" element={< SettingsScreen />} />
          </Routes>
        </Router>
      </LoadingWrapper>
    </StrictMode>
  </Provider>
)
