import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LongPressButton = () => {
  const [pressTimer, setPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const startPressTimer = () => {
    const timer = setTimeout(() => {
      navigate('/settings');
    }, 4000);
    setPressTimer(timer);
  };

  const clearPressTimer = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  useEffect(() => {
    return () => {
      if (pressTimer) clearTimeout(pressTimer);
    };
  }, [pressTimer]);

  return (
    <button
      onMouseDown={startPressTimer}
      onMouseUp={clearPressTimer}
      onMouseLeave={clearPressTimer}
      onTouchStart={startPressTimer}
      onTouchEnd={clearPressTimer}
      className='long-press-button'
    >
      .
    </button>
  );
};

export default LongPressButton;
