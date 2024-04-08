import React from 'react'
import TaskCreate from './TaskCreate'
import Toolbar from '../Toolbar'

const ActivityCreate = () => {
  return (
    <div className="flex">
      <div className="toolbar flex-none">
        <Toolbar />
      </div>
      <div className="tasks flex-grow p-4">
        <div>Activity</div>
        <TaskCreate />
        <TaskCreate />
        <TaskCreate />
        <TaskCreate />
        <TaskCreate />
      </div>
    </div>
  )
}

export default ActivityCreate