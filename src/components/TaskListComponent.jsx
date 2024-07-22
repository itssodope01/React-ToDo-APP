import React from 'react';
import TaskComponent from './TaskComponent';

function TaskListComponent({ tasks, toggleCompletion, deleteTask, moveTaskUp, moveTaskDown, PinToTop }) {
    return (
        <ol className='todo-list'>
            {tasks.map((task, index) => (
                <TaskComponent
                    key={index}
                    task={task}
                    index={index}
                    toggleCompletion={toggleCompletion}
                    deleteTask={deleteTask}
                    moveTaskUp={moveTaskUp}
                    moveTaskDown={moveTaskDown}
                    PinToTop={PinToTop}
                    isPinned={false}
                />
            ))}
        </ol>
    );
}

export default TaskListComponent;
