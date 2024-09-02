import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App.tsx'
import "./css/index.css"
import store from './redux/store.tsx';
import { Provider } from 'react-redux';
import SpellingNormal from './screens/SpellingNormal.tsx';
import SpellingPractice from './screens/SpellingPractice.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/spellingpractice">Spelling Practice</Link>
          <Link to="/spellingnormal">Spelling Normal</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/spellingnormal" element={< SpellingNormal />} />
          <Route path="/spellingpractice" element={< SpellingPractice />} />
          <Route path="/settings" element={< SettingsScreen />} />
        </Routes>
      </Router>
    </StrictMode>
  </Provider>
)
