import React from 'react';
import FocusTimer from './components/FocusTimer';
import BreathingBubble from './components/BreathingBubble';
import AmbientSound from './components/AmbientSound';
import TaskList from './components/TaskList';

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Aura</h1>
        <p>A minimalist Space to Breathe, Focus, and Write Down Your Thoughts.</p>
      </header>

      <main className="dashboard-grid">
        <FocusTimer />
        <BreathingBubble />
        <AmbientSound />
        <TaskList />
      </main>

      <footer>
        <p>Designed for daily presence & calm.</p>
      </footer>
    </div>
  );
}
