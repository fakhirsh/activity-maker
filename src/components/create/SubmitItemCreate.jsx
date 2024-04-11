import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useGlobal } from '../../GlobalContext';

const SubmitItemCreate = ({ index, task}) => {
    const { deleteTaskItem, updateTaskItem } = useGlobal();
    
    // Access the specific item using the index
    const item = task.items[index];

    const handleDeleteTaskItem = () => {
        deleteTaskItem(task.id, index);
    }

    return (
        <div className="flex flex-col mt-2 relative">
            <button
                className="absolute top-0 right-0 mt-2 mr-2 text-red-500"
                onClick={handleDeleteTaskItem}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <label className="block mb-2 font-bold">{item.type}</label>
            <textarea 
                className="px-4 py-2 bg-red-100 border border-gray-300 rounded-md shadow-sm resize-y focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" 
                value="" 
                onChange={() => {}}
                placeholder="Enter submission..."
            />
            {item.submitButton && <button className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out">Submit</button>}
        </div>
    )
}

export default SubmitItemCreate