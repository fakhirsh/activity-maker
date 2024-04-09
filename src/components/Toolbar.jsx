import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAlignLeft, faCode, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useGlobal } from '../GlobalContext';

const Toolbar = () => {
    const { addTask } = useGlobal();
    const { isEditing, clearSelection } = useGlobal();

    
    const handleAddTask = () => {
        // Here you define what a new task looks like
        const newTask = {
            id: Date.now(), // simple unique id
            name: 'New Task',
            completed: false,
        };
        addTask(newTask);
    };
    
    return (

        <div className="toolbar">
            <div className="toolbar flex flex-col items-center bg-gray-200 p-4 space-y-4">
                {isEditing ? (
                    <>
                        <FontAwesomeIcon icon={faAlignLeft} onClick={clearSelection} size="lg"/>
                        <FontAwesomeIcon icon={faCode} onClick={clearSelection} size="lg"/>
                        <FontAwesomeIcon icon={faPaperPlane} onClick={clearSelection} size="lg"/>

                    </>
                ) : (
                    <>
                    {/* Show a plus icon to add tasks when not in edit mode */}
                    
                        <button onClick={handleAddTask}>
                            <FontAwesomeIcon icon={faPlus} size="lg" />
                        </button>
              
                    {/* Add more addition-related buttons/icons here */}
                    </>
                )}
            </div>
        </div>



        
    )
}

export default Toolbar