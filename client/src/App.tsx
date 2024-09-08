import { useEffect } from 'react';
import ReactRouter from './ReactRouter'
import useWord from './hooks/useWord.tsx'
// import { useSelector } from 'react-redux';
// import { RootState } from './redux/store.tsx';

export default function App() {

  // Initialize our word with data in the redux  reducer
  const { chngWord } = useWord();
  useEffect(() => {
    chngWord();
  }, [])

  // const points = useSelector((state: RootState) => state.points);

  // useEffect(() => {
  // }, [points])
  return (
    <>
      <ReactRouter />
    </>
  )
}

