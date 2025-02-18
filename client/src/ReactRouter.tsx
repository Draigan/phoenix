import SpellingNormal from './screens/SpellingNormal.tsx';
import SpellingWord from './screens/SpellingPractice.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import WordImageScreen from './screens/WordImageScreen.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoPlayerScreen from './screens/VideoPlayerScreen.tsx';
import Testing from './screens/Testing.tsx';
import NathanSettings from './screens/NathanSetting.tsx';
import VideoChooserScreen from './screens/VideoChooserScreen.tsx';
export default function ReactRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/spellingnormal" element={< SpellingNormal />} />
        <Route path="/videoplayer" element={< VideoPlayerScreen />} />
        <Route path="/wordimage" element={< WordImageScreen />} />
        <Route path="/" element={< SpellingWord />} />
        <Route path="/settings" element={< SettingsScreen />} />
        <Route path="/testing" element={< Testing />} />
        <Route path="/nathansettings" element={< NathanSettings />} />
        <Route path="/videochooser" element={< VideoChooserScreen />} />
      </Routes>
    </Router>
  )
}

