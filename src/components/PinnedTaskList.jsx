import React from 'react';
import PinnedTaskItem from './PinnedTaskItem';

function PinnedTaskList({ pinnedTasks, toggleCompletion, deleteTask, unpinTask }) {
    return (
        <ol className='todo-pin'>
            {pinnedTasks.map((task, index) => (
                <PinnedTaskItem
                    key={index}
                    task={task}
                    index={index}
                    toggleCompletion={toggleCompletion}
                    deleteTask={deleteTask}
                    unpinTask={unpinTask}
                />
            ))}
        </ol>
    );
}

export default PinnedTaskList;
