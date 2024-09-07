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
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '5px',
        backgroundColor: 'transparent',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      .
    </button>
  );
};

export default LongPressButton;
