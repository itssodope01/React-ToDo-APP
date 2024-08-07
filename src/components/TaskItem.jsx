import React from 'react';

function TaskItem({ task, index, toggleCompletion, deleteTask, moveTaskUp, moveTaskDown, PinToTop, handleEdit }) {

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
                    className='edit-button'
                    onClick={() => handleEdit(index, 'setTasks')}
                    title='Edit Task'
                >
                    <i className="fas fa-edit"></i>
                </button>
                <button
                    className='delete-button'
                    onClick={() => deleteTask(index)}
                    title='Delete Task'
                >
                    <i className="fas fa-trash"></i>
                </button>
                <button
                    className='up-button'
                    onClick={() => moveTaskUp(index)}
                    title='Move Up'
                >
                    <i className="fas fa-chevron-up"></i>
                </button>
                <button
                    className='down-button'
                    onClick={() => moveTaskDown(index)}
                    title='Move Down'
                >
                    <i className="fas fa-chevron-down"></i>
                </button>
                <button
                    className='pin-button'
                    onClick={() => 
                        PinToTop(index)
                    }
                    title='Pin Task'
                >
                    <i className="fas fa-thumbtack"></i>
                </button>
            </div>
        </li>
    );
}

export default TaskItem;