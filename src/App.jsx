
import './App.css'
import React, { useState } from 'react';
import ActivityCreate from './components/create/ActivityCreate'
import Activity from './components/preview/Activity'
import { GlobalProvider } from './GlobalContext';

function App() {
  const [leftWidth, setLeftWidth] = useState(50); // Starting width in percentage

  const startDrag = (e) => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDrag);
  };

  const onMouseMove = (e) => {
    // Calculate new width as a percentage of the window width
    const newWidth = (e.clientX / window.innerWidth) * 100;
    // Constrain the new width between 20% and 80%
    const constrainedWidth = Math.min(Math.max(newWidth, 20), 80);
    setLeftWidth(constrainedWidth);
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', stopDrag);
  };

  return (
    <GlobalProvider>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-none" style={{ width: `${leftWidth}%` }}>
          <ActivityCreate />
        </div>
        <div className="flex-grow overflow-y-auto">
          <Activity />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App
