import React, { useState, useEffect } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('aura_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Breathe deliberately', completed: true },
      { id: 2, text: 'Complete daily goal', completed: false }
    ];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('aura_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="card" style={{ justifyContent: 'flex-start' }}>
      <h3 className="card-title">Zen List</h3>
      
      <form onSubmit={addTask} style={{ display: 'flex', width: '100%', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-family)',
            outline: 'none'
          }}
        />
        <button type="submit" style={{ padding: '0.5rem 0.8rem' }}>+</button>
      </form>

      <ul style={{ listStyle: 'none', width: '100%', maxHeight: '180px', overflowY: 'auto' }}>
        {tasks.map(task => (
          <li 
            key={task.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.4rem 0',
              borderBottom: '1px solid #FAF9F6'
            }}
          >
            <span 
              onClick={() => toggleComplete(task.id)}
              style={{ 
                cursor: 'pointer',
                fontSize: '0.9rem',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                transition: 'var(--transition)'
              }}
            >
              {task.completed ? '✓ ' : '○ '} {task.text}
            </span>
            <span 
              onClick={() => deleteTask(task.id)}
              style={{ cursor: 'pointer', color: '#D98E8E', fontSize: '0.8rem', paddingLeft: '1rem' }}
            >
              Delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}