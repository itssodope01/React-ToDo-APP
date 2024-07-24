import React from 'react';

function PinnedTaskItem({ task, index, toggleCompletion, deleteTask, unpinTask, handleEdit }) {
    return (
        <li key={index}>
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
                    className='edit-button'
                    onClick={() => handleEdit(index)}
                >
                    <i className="fas fa-edit"></i>
                </button>
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
                    <span className="fa-stack">
                        <i className="fas fa-thumbtack"></i>
                        <i className="fas fa-slash fa-stack-1x"></i>
                    </span>
                </button>
            </div>
        </li>
    );
}

export default PinnedTaskItem;