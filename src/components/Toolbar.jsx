import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAlignLeft, faCode, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useGlobal } from '../GlobalContext';

const Toolbar = () => {
    const { addTask } = useGlobal();
    const { isEditing, clearSelection, addItemToSelectedTask, selectedTaskId, setSelectedTaskId } = useGlobal();

    
    const handleAddTask = (e) => {
        e.stopPropagation(); // Prevent event from propagating
        const newTask = {
            id: Date.now(), // simple unique id
            name: 'New Task',
            items: [], // Initialize an empty items array
            completed: false,
        };
        addTask(newTask);
    };

    const handleAddTextItem = (e) => {
        e.stopPropagation(); // Prevent event from propagating
        if (!selectedTaskId) return; // Guard clause if no task is selected
        const newTextItem = { id: Date.now(), type: "markdown", content: "" }; // Default content as empty string
        addItemToSelectedTask(newTextItem);
    };

    const handleAddCodeItem = (e) => {
        e.stopPropagation(); // Prevent event from propagating
        if (!selectedTaskId) return; // Guard clause if no task is selected
        const newCodeItem = { id: Date.now(), type: "code", content: "" };
        addItemToSelectedTask(newCodeItem);
    };

    const handleAddSubmissionItem = (e) => {
        e.stopPropagation(); // Prevent event from propagating
        if (!selectedTaskId) return; // Guard clause if no task is selected
        const newSubmissionItem = { id: Date.now(), type: "submission", content: "", submitButton: true };
        addItemToSelectedTask(newSubmissionItem);
    };
    
    return (
        <div className="toolbar flex flex-col items-center bg-gray-200 p-4 space-y-4">
            {isEditing ? (
                <>
                    <button onClick={handleAddTextItem}>
                        <FontAwesomeIcon icon={faAlignLeft} size="lg"/>
                    </button>
                    <button onClick={handleAddCodeItem}>
                        <FontAwesomeIcon icon={faCode} size="lg"/>
                    </button>
                    <button onClick={handleAddSubmissionItem}>
                        <FontAwesomeIcon icon={faPaperPlane} size="lg"/>
                    </button>
                </>
            ) : (
                <>
                    <button onClick={handleAddTask}>
                        <FontAwesomeIcon icon={faPlus} size="lg" />
                    </button>
                </>
            )}
        </div>
    );
}

export default Toolbar