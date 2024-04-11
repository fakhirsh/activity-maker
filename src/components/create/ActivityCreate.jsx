import React from 'react'
import TaskCreate from './TaskCreate'
import Toolbar from '../Toolbar'
import { useGlobal } from '../../GlobalContext';

const ActivityCreate = () => {

    const { tasks } = useGlobal();
    
    return (
        <div className="flex">
            <div className="toolbar flex-none">
                <Toolbar />
            </div>
            <div className="tasks flex-grow p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                {/* <div className='text-4xl'>Activity</div> */}
                <input type="text" className="border border-gray-400 p-2 w-full" placeholder="Activity Name" />
                {/* Iterate over tasks and render a Task component for each task */}
                {tasks.map((task) => (
                    <TaskCreate key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default ActivityCreate