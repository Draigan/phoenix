import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App.tsx'
import "./css/index.css"
import SpellingScreen from './screens/SpellingScreen.tsx';
import store from './redux/store.tsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/spelling">Spelling</Link>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/spelling" element={< SpellingScreen />} />
        </Routes>
      </Router>
    </StrictMode>
  </Provider>
)
