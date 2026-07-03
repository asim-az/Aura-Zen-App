import React, { useState, useEffect, useRef } from 'react';

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Trigger transition
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);
            setSeconds(0);
            setIsActive(false);
            // Optional: Simple browser beep sound on finish
            try {
              const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              osc.connect(gain);
              gain.connect(audioCtx.destination);
              gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
              osc.frequency.setValueAtTime(440, audioCtx.currentTime);
              osc.start();
              osc.stop(audioCtx.currentTime + 0.3);
            } catch (e) {}
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="card">
      <h3 className="card-title">{isBreak ? 'Short Break' : 'Focus Session'}</h3>
      <div style={{ fontSize: '3rem', fontWeight: '300', margin: '1rem 0', letterSpacing: '-0.02em' }}>
        {formattedTime}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="primary" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}