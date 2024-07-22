import React from 'react';
import TaskComponent from './TaskComponent';

function PinnedTaskListComponent({ pinnedTasks, toggleCompletion, deleteTask, unpinTask }) {
    return (
        <ol className='todo-pin'>
            {pinnedTasks.map((task, index) => (
                <TaskComponent
                    key={index}
                    task={task}
                    index={index}
                    toggleCompletion={toggleCompletion}
                    deleteTask={deleteTask}
                    unpinTask={unpinTask}
                    isPinned={true}
                />
            ))}
        </ol>
    );
}

export default PinnedTaskListComponent;
