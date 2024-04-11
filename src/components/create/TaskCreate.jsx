import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useGlobal } from '../../GlobalContext';
import TextItemCreate from './TextItemCreate';
import CodeItemCreate from './CodeItemCreate';

const TaskCreate = ({task}) => {
  const [description, setDescription] = useState('');
  const { deleteTask, selectTask, clearSelection, selectedTaskId } = useGlobal(); // Assuming `setTasks` is available in your context for updating the tasks array
  const { moveTaskUp, moveTaskDown, isEditing, setIsEditing } = useGlobal(); // Destructure your new functions from the context

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
          // If there's a click outside the task component, and isEditing is false, clear the selection
          if (taskRef.current && !taskRef.current.contains(event.target) && !isEditing) {
              clearSelection();
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearSelection, isEditing]); // Add isEditing as a dependency

  return (
    <div 
      ref={taskRef}
      className={`task-container relative p-4 border rounded shadow-sm mb-2 ${isSelected ? 'ring-2 ring-blue-300' : ''} min-h-[90px]`} 
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

          <div className="flex-grow mr-4 flex flex-col">
            {task.items?.map((item, index) => {
                switch (item.type) {
                    case "markdown":
                        return(
                          <TextItemCreate key={index} task={task} index={index} /> // Use JSX syntax to render the component
                        )
                    case "code": // "code" items might be similar to "text" but could be styled differently or use a code editor component
                        return (
                          <CodeItemCreate key={index} task={task} index={index} />
                        );
                    case "submission":
                        return (
                          <div key={index} className="flex flex-col mt-2">
                              <label className="block mb-2 font-bold">{item.type}</label>
                              <textarea 
                                  className="px-4 py-2 bg-red-100 border border-gray-300 rounded-md shadow-sm resize-y focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" 
                                  value={item.content} 
                                  onChange={handleInputChange}
                                  placeholder="Enter submission..."
                              />
                              {item.submitButton && <button className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out">Submit</button>}
                          </div>
                        );
                    default:
                        return null;
                }
            })}
          </div>

          {/* Up and Down arrow buttons */}
          <button
            className="absolute bottom-0 right-0 mb-8 mr-2 text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              moveTaskUp(task.id);
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className="absolute bottom-0 right-0 mb-2 mr-2 text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              moveTaskDown(task.id);
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>

      </div>

  )
}

export default TaskCreate