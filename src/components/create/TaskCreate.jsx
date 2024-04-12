import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useGlobal } from '../../GlobalContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TextItemCreate from './TextItemCreate';
import CodeItemCreate from './CodeItemCreate';
import SubmitItemCreate from './SubmitItemCreate';

const TaskCreate = ({task}) => {
  const [description, setDescription] = useState('');
  const { deleteTask, selectTask, clearSelection, selectedTaskId } = useGlobal(); // Assuming `setTasks` is available in your context for updating the tasks array
  const { moveTaskUp, moveTaskDown, isEditing, setIsEditing } = useGlobal(); // Destructure your new functions from the context
  const { onDragEndTaskItems } = useGlobal();

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
          if (taskRef.current && !taskRef.current.contains(event.target)) {
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
            <DragDropContext onDragEnd={onDragEndTaskItems}>
              <Droppable droppableId={task.id.toString()}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {task.items?.map((item, index) => (
                      
                      <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>

                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.type === "markdown" && <TextItemCreate key={index} task={task} index={index} />}
                            {item.type === "code" && <CodeItemCreate key={index} task={task} index={index} />}
                            {item.type === "submission" && <SubmitItemCreate key={index} task={task} index={index} />}
                          </div> 

                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  
                )}
                
              </Droppable>
            </DragDropContext>
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