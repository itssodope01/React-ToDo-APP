import React, { useState } from 'react';


function ToDoList() {
    const [task, setTasks] = useState([]);
    const [pinnedTask, setPinnedTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            const taskCombined = [...pinnedTask, ...task];
            if (!taskCombined.some(t => t.text.toLowerCase() === newTask.toLowerCase())) {
                setTasks(t => [{ text: newTask, completed: false }, ...t]);
                setNewTask("");
            } else {
                alert(`"${newTask}" is already added on the list!`);
            }
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    }

    function deleteTask(index, array, setter) {
        const updatedTask = array.filter((_, i) => i !== index);
        setter(updatedTask);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index - 1]] =
                [updatedTask[index - 1], updatedTask[index]];

            setTasks(updatedTask);
        }
    }

    function moveTaskDown(index) {
        if (index < (task.length - 1)) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index + 1]] =
                [updatedTask[index + 1], updatedTask[index]];

            setTasks(updatedTask);
        }
    }

    function PinToTop(index) {
        if (task.length > 1) {
            const taskToPin = task[index];
            const filteredTasks = task.filter((_, i) => i !== index);
            const updatedPinTask = [taskToPin, ...pinnedTask];

            setTasks(filteredTasks);
            setPinnedTask(updatedPinTask);
        }
    }

    function unpinTask(index) {
        if (pinnedTask.length > 0) {
            const taskToUnpin = pinnedTask[index];
            const filteredPinTasks = pinnedTask.filter((_, i) => i !== index);
            const updatedTask = [taskToUnpin, ...task];

            setTasks(updatedTask);
            setPinnedTask(filteredPinTasks);
        }
    }

    function toggleCompletion(index, array, setter) {
        const updatedArray = array.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setter(updatedArray);
    }

    function resetList() {
        setTasks([]);
        setPinnedTask([]);
    }

    return (
        <>
            <div className='todo-container'>
                <h1>ToDo List</h1>

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

                <button
                    className='reset-button'
                    onClick={resetList}
                >
                    Reset List
                </button>

                <div className='pin-container'>
                    <ol className='todo-pin'>
                        {pinnedTask.map((task, index) =>
                            <li key={index}>
                                <div className='checkbox-container'>
                                    <input
                                        id={`pinned-task-checkbox-${index}`}
                                        type='checkbox'
                                        checked={task.completed}
                                        onChange={() => toggleCompletion(index, pinnedTask, setPinnedTask)}
                                    />
                                    <label htmlFor={`pinned-task-checkbox-${index}`} />
                                </div>
                                <span className={`pinned-task ${task.completed ? 'completed' : ''}`}>
                                    {task.text}
                                </span>
                                <div className='button-container'>
                                    <button
                                        className='delete-button'
                                        onClick={() => deleteTask(index, pinnedTask, setPinnedTask)}
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
                        )}
                    </ol>
                </div>

                <div className='task-container'>
                    <ol className='todo-list'>
                        {task.map((t, index) =>
                            <li key={index}>
                                <div className='checkbox-container'>
                                    <input
                                        id={`task-checkbox-${index}`}
                                        type='checkbox'
                                        checked={t.completed}
                                        onChange={() => toggleCompletion(index, task, setTasks)}
                                    />
                                    <label htmlFor={`task-checkbox-${index}`} />
                                </div>
                                <span className={`task ${t.completed ? 'completed' : ''}`}>
                                    {t.text}
                                </span>
                                <div className='button-container'>
                                    <button
                                        className='delete-button'
                                        onClick={() => deleteTask(index, task, setTasks)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
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
                                </div>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </>
    );
}

export default ToDoList;
