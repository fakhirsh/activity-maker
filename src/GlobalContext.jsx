// GlobalContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track the selected task id

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    console.log(task);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

//   const toggleEditing = () => {
//     setIsEditing(!isEditing);
//   };

  const selectTask = (taskId) => {
    setSelectedTaskId(taskId);
    setIsEditing(true); // Enter editing mode when a task is selected
  };

  const clearSelection = () => {
    setSelectedTaskId(null);
    setIsEditing(false); // Exit editing mode
  };

  // Automatically include all states and functions in the provider value
  const contextValue = {
    tasks,
    addTask,
    deleteTask,
    setIsEditing,
    selectedTaskId,
    isEditing,
    selectTask,
    clearSelection,
    // toggleEditing,
    // Add new states and functions here as they are created
  };


  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
