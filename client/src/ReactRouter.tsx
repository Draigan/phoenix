import SpellingNormal from './screens/SpellingNormal.tsx';
import SpellingWord from './screens/SpellingPractice.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import WordImageScreen from './screens/WordImageScreen.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
export default function ReactRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/spellingnormal" element={< SpellingNormal />} />
        <Route path="/wordimage" element={< WordImageScreen />} />
        <Route path="/" element={< SpellingWord />} />
        <Route path="/settings" element={< SettingsScreen />} />
      </Routes>
    </Router>
  )
}

