import React from 'react';

function PinnedTaskItem({ task, index, toggleCompletion, deleteTask, unpinTask }) {
    return (
        <li>
            <div className='checkbox-container'>
                <input
                    id={`pinned-task-checkbox-${index}`}
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleCompletion(index)}
                />
                <label htmlFor={`pinned-task-checkbox-${index}`} />
            </div>
            <span className={`pinned-task ${task.completed ? 'completed' : ''}`}>
                {task.text}
            </span>
            <div className='button-container'>
                <button
                    className='delete-button'
                    onClick={() => deleteTask(index)}
                >
                    <i className="fas fa-trash"></i>
                </button>
                <button
                    className='unpin-button'
                    onClick={() => unpinTask(index)}
                >
                    Unpin
                </button>
            </div>
        </li>
    );
}

export default PinnedTaskItem;
