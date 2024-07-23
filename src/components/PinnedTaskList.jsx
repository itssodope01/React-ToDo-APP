import React from 'react';
import PinnedTaskItem from './PinnedTaskItem';

function PinnedTaskList({ pinnedTasks, toggleCompletion, deleteTask, unpinTask }) {
    return (
        
        <ol className='todo-pin'>
            {pinnedTasks.map((task, index) => (
                <div id={`pinned-task-${index}`}>
                <PinnedTaskItem
                    key={index}
                    task={task}
                    index={index}
                    toggleCompletion={toggleCompletion}
                    deleteTask={deleteTask}
                    unpinTask={unpinTask}
                />
                </div>
            ))}
        </ol>
        
    );
}

export default PinnedTaskList;
