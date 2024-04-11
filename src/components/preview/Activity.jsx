import React from 'react'
import { useGlobal } from '../../GlobalContext';
import Task from './Task';

const Activity = () => {
  const { tasks } = useGlobal();
    
    return (
        <div className="flex">
            <div className="tasks flex-grow p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                <div>Activity</div>
                {/* Iterate over tasks and render a Task component for each task */}
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default Activity