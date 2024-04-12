import React from 'react'
import TaskCreate from './TaskCreate'
import Toolbar from '../Toolbar'
import { useGlobal } from '../../GlobalContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ActivityCreate = () => {

    const { tasks, onDragEnd } = useGlobal();
    
    return (
        <div className="flex">
            <div className="toolbar flex-none">
                <Toolbar />
            </div>
            <div className="tasks flex-grow p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                {/* <div className='text-4xl'>Activity</div> */}
                <input type="text" className="border border-gray-400 p-2 w-full" placeholder="Activity Name" />
                {/* Iterate over tasks and render a Task component for each task */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskCreate key={task.id} task={task} />        
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
        </div>
    )
}

export default ActivityCreate