import React from 'react'
import { useGlobal } from '../../GlobalContext';
import Task from './Task';

const Activity = () => {
  const { tasks } = useGlobal();
    
    return (
      <div className="flex bg-gray-200 items-start justify-center h-screen w-full">
            <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl w-full border border-blue-500 mt-10 md:mt-20">
                <div className='text-4xl'>Activity</div>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default Activity