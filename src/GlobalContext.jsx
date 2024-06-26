// GlobalContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track the selected task id
  const [toolbarRef, setToolbarRef] = useState(null);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
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

  const updateTaskItem = (taskId, itemIndex, newContent) => {
    setTasks((currentTasks) => {
        return currentTasks.map((task) => {
            if (task.id === taskId) {
                // Create a copy of items and update the specific item's content
                const updatedItems = task.items.map((item, index) => {
                    if (index === itemIndex) {
                        return { ...item, content: newContent };
                    }
                    return item;
                });
                // Return the updated task
                return { ...task, items: updatedItems };
            }
            return task;
        });
    });
  };

  const deleteTaskItem = (taskId, itemIndex) => {
    setTasks(prevTasks => prevTasks.map(task => {
        if (task.id === taskId) {
            const filteredItems = task.items.filter((_, index) => index !== itemIndex);
            return { ...task, items: filteredItems };
        }
        return task;
    }));
  };

  const moveTaskItem = (taskId, itemIndex, direction) => {
      // Logic to reorder items within a task
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
          // Assuming each task has an 'items' array
          return { ...task, items: [...task.items, item] };
        }
        return task;
      });
    });
  };

  const onDragEnd = (result) => {
    
    if (!result.destination) return

    const newItems = [...tasks]
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed)
    setTasks(newItems)
  }

  // ondragend for items in task
  const onDragEndTaskItems = (result) => {
    if (!result.destination) return

    const newItems = [...tasks]
    const [task] = newItems.filter(task => task.id === selectedTaskId)
    const newTask = { ...task }
    const [removed] = newTask.items.splice(result.source.index, 1)
    newTask.items.splice(result.destination.index, 0, removed)
    setTasks(newItems)
  }


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
    updateTaskItem,
    deleteTaskItem,
    moveTaskItem,
    onDragEnd,
    onDragEndTaskItems,
    toolbarRef,
    setToolbarRef,
    // Add new states and functions here as they are created
  };


  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
