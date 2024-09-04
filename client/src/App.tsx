import { useEffect } from 'react';
import ReactRouter from './ReactRouter'
import useWord from './hooks/useWord.tsx'

export default function App() {

  // Initialize our word with data in the redux  reducer
  const { chngWord } = useWord();
  useEffect(() => {
    chngWord();
  }, [])

  return (
    <ReactRouter />
  )
}

