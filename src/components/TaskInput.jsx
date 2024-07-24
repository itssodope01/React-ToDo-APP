import React from 'react';

function TaskInput({ newTask, handleInputChange, handleKeyDown, addTask }) {
    return (
        <div className='input-div'>
            <input
                className='todo-input'
                value={newTask}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='Enter new task...'
            />
            <button
                className='add-button'
                onClick={addTask}
            >
                <i className="fas fa-plus"></i>
            </button>
        </div>
    );
}

export default TaskInput;