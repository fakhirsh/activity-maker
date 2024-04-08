import React from 'react'

const Task = () => {
  const [task, setTask] = React.useState({ name: 'task 1', description: '' })

  const handleInputChange = (e) => {
    // Update the task based on input changes
    setTask({...task, [e.target.name]: e.target.value });
  };
  
return (
    <div className="mb-4 max-w-md">
        <label className="block mb-2 font-bold">{task.name}</label>
        <textarea
            className="block w-full h-32 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm resize-y focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            placeholder="Description in Markdown"
        ></textarea>
    </div>

)
}

export default Task