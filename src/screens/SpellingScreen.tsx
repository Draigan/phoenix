import { useState } from 'react'
import SpellingPractice from '../components/SpellingPractice';
import SpellingNormal from '../components/SpellingNormal';

export default function SpellingScreen() {
  const [mode, setMode] = useState<'normal' | 'practice'>('normal');
  if (mode === 'normal') {
    return (
      <>
        <SpellingNormal />
        <button onClick={() => setMode(prev => {
          if (prev === 'practice') {
            return 'normal'
          } else {
            return 'practice'
          }
        })}> Switch </button>
      </>
    )
  }
  if (mode === 'practice') {
    return (
      <>
        <SpellingPractice />
        <button onClick={() => setMode(prev => {
          if (prev === 'practice') {
            return 'normal'
          } else {
            return 'practice'
          }
        })}> Switch </button>
      </>
    )
  }
}

