import React from 'react';

function TaskComponent({ task, index, toggleCompletion, deleteTask, moveTaskUp, moveTaskDown, PinToTop, isPinned, unpinTask }) {
    return (
        <li key={index}>
            <div className='checkbox-container'>
                <input
                    id={`task-checkbox-${index}`}
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleCompletion(index)}
                />
                <label htmlFor={`task-checkbox-${index}`} />
            </div>
            <span className={`task ${task.completed ? 'completed' : ''}`}>
                {task.text}
            </span>
            <div className='button-container'>
                <button
                    className='delete-button'
                    onClick={() => deleteTask(index)}
                >
                    <i className="fas fa-trash"></i>
                </button>
                {!isPinned && (
                    <>
                        <button
                            className='up-button'
                            onClick={() => moveTaskUp(index)}
                        >
                            <i className="fas fa-chevron-up"></i>
                        </button>
                        <button
                            className='down-button'
                            onClick={() => moveTaskDown(index)}
                        >
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        <button
                            className='pin-button'
                            onClick={() => PinToTop(index)}
                        >
                            <i className="fas fa-thumbtack"></i>
                        </button>
                    </>
                )}
                {isPinned && (
                    <button
                        className='unpin-button'
                        onClick={() => unpinTask(index)}
                    >
                        Unpin
                    </button>
                )}
            </div>
        </li>
    );
}

export default TaskComponent;