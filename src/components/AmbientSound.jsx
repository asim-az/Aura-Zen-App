import React, { useState, useEffect, useRef } from 'react';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainNodeRef = useRef(null);

  const startSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Low pass filter creates a dark, warm sound representation
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, ctx.currentTime);

      // Warm analog gain with visual fade-in to prevent sharp pops
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.5);
      gainNodeRef.current = gain;

      // Deep root tone (low A note)
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(110, ctx.currentTime);
      osc1Ref.current = osc1;

      // Slightly detuned oscillator creating natural acoustic beating
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110.4, ctx.currentTime);
      osc2Ref.current = osc2;

      // Connect nodes
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
    } catch (e) {
      console.error("Web Audio API is not supported in this environment.", e);
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      // Smooth fade-out before stopping oscillators
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      setTimeout(() => {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
        } catch (e) {}
      }, 1300);
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="card">
      <h3 className="card-title">Ambient Sound</h3>
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {isPlaying ? 'Playing deep calm drone' : 'Sound is currently muted'}
        </p>
        <button className={isPlaying ? 'primary' : ''} onClick={handleToggle}>
          {isPlaying ? 'Mute' : 'Play White Drone'}
        </button>
      </div>
    </div>
  );
}