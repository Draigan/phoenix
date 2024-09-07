import { useCallback, useRef } from 'react'

const usePlaySound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
    } else {
      audioRef.current = new Audio(url);
    }

    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const cleanUpSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

  }, []);

  return { playSound, cleanUpSound };
}

export default usePlaySound;

