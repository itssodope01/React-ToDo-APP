import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, toggleCompletion, deleteTask, moveTaskUp, moveTaskDown, PinToTop }) {
    return (
        <ol className='todo-list'>
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    toggleCompletion={toggleCompletion}
                    deleteTask={deleteTask}
                    moveTaskUp={moveTaskUp}
                    moveTaskDown={moveTaskDown}
                    PinToTop={PinToTop}
                />
            ))}
        </ol>
    );
}

export default TaskList;
