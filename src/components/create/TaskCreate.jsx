import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useGlobal } from '../../GlobalContext';

const TaskCreate = ({task}) => {
  const [description, setDescription] = useState('');
  const { deleteTask, selectTask, clearSelection, selectedTaskId } = useGlobal(); // Assuming `setTasks` is available in your context for updating the tasks array

  const isSelected = task.id === selectedTaskId;
  const taskRef = useRef(null); // Step 1: Create a ref for the component

  const handleInputChange = (e) => {
    setDescription(e.target.value); // Update state with the new value
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(task.id);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Add logic to determine if the click is outside the task element
      // If so, call clearSelection
      if (taskRef.current && !taskRef.current.contains(event.target)) {
        clearSelection(); // Call clearSelection if the click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearSelection]);

  return (
    <div 
      ref={taskRef}
      className={`task-container relative p-4 border rounded shadow-sm mb-2 ${isSelected ? 'ring-2 ring-blue-300' : ''}`} 
      onClick={() => selectTask(task.id)}
    >
          {/* Delete button */}
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-red-500"
            onClick={() => handleDeleteTask(task.id)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <label className="block mb-2 font-bold">{task.name}</label>
          <textarea
              className="block w-full h-32 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm resize-y focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              name="description"
              value={description} // Bind state to the textarea's value
              onChange={handleInputChange}
              placeholder="Description in Markdown"
          ></textarea>
      </div>

  )
}

export default TaskCreate