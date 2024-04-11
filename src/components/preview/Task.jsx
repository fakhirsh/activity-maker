import React from 'react'
import SubmitItem from './SubmitItem';
import CodeItem from './CodeItem';
import TextItem from './TextItem';

const Task = ({ task }) => {
    // Render the task based on its type
    const renderTaskItem = (item) => {
      switch (item.type) {
        case 'text':
          return <TextItem key={item.id} content={item.content} />;
        case 'code':
          return <CodeItem key={item.id} content={item.content} />;
        case 'submission':
          return <SubmitItem key={item.id} content={item.content} />;
        default:
          return null; // In case of an unknown type
      }
    };
  
    return (
      <div className="task">
        {/* Assuming your task object contains an array of items */}
        {task.items.map((item) => renderTaskItem(item))}
      </div>
    );
  };

export default Task