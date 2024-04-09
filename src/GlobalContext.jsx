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

  const selectTask = (taskId) => {
    setSelectedTaskId(taskId);
    setIsEditing(true); // Enter editing mode when a task is selected
  };

  const clearSelection = () => {
    setSelectedTaskId(null);
    setIsEditing(false); // Exit editing mode
  };


  const moveTaskUp = (taskId) => {
    setTasks((currentTasks) => {
      const index = currentTasks.findIndex(task => task.id === taskId);
      // If it's the first task or not found, do nothing
      if (index <= 0) return currentTasks;

      const newTasks = [...currentTasks];
      // Swap task with the one above it
      [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
      return newTasks;
    });
  };

  const moveTaskDown = (taskId) => {
    setTasks((currentTasks) => {
      const index = currentTasks.findIndex(task => task.id === taskId);
      // If it's the last task or not found, do nothing
      if (index === -1 || index === currentTasks.length - 1) return currentTasks;

      const newTasks = [...currentTasks];
      // Swap task with the one below it
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      return newTasks;
    });
  };

  const addItemToSelectedTask = (item) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === selectedTaskId) {
          console.log("Adding item to task:", task); // Debugging line
          // Assuming each task has an 'items' array
          return { ...task, items: [...task.items, item] };
        }
        return task;
      });
    });
  };


  // Automatically include all states and functions in the provider value
  const contextValue = {
    tasks,
    addTask,
    deleteTask,
    isEditing,
    setIsEditing,
    selectedTaskId,
    selectTask,
    clearSelection,
    moveTaskUp,
    moveTaskDown,
    addItemToSelectedTask,
    // Add new states and functions here as they are created
  };


  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
