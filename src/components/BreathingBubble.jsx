import React, { useState, useEffect } from 'react';

const STEPS = [
  { text: 'Inhale', phaseClass: 'inhale' },
  { text: 'Hold', phaseClass: 'hold' },
  { text: 'Exhale', phaseClass: 'exhale' },
  { text: 'Hold', phaseClass: 'hold' },
];

export default function BreathingBubble() {
  const [stepIndex, setStepIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setStepIndex((currentIdx) => (currentIdx + 1) % STEPS.length);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentStep = STEPS[stepIndex];

  return (
    <div className="card">
      <h3 className="card-title">Mindful Breathing</h3>
      <div className="breathing-wrapper">
        <div className={`breathing-circle-outer ${currentStep.phaseClass}`}>
          <div className="breathing-circle-inner" />
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{currentStep.text}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{secondsRemaining}s remaining</p>
        </div>
      </div>
    </div>
  );
}