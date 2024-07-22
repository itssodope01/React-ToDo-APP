import React, { useState, useEffect } from 'react';
import InputComponent from './components/InputComponent';
import TaskListComponent from './components/TaskListComponent';
import PinnedTaskListComponent from './components/PinnedTaskListComponent';

function ToDoList() {
    const [task, setTasks] = useState([]);
    const [pinnedTask, setPinnedTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const savedPinnedTasks = JSON.parse(localStorage.getItem('pinnedTasks')) || [];
        setTasks(savedTasks);
        setPinnedTask(savedPinnedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(task));
        localStorage.setItem('pinnedTasks', JSON.stringify(pinnedTask));
    }, [task, pinnedTask]);

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

    function deleteTask(index, isPinned) {
        if (isPinned) {
            setPinnedTask(pinnedTask.filter((_, i) => i !== index));
        } else {
            setTasks(task.filter((_, i) => i !== index));
        }
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
            setTasks(filteredTasks);
            setPinnedTask([taskToPin, ...pinnedTask]);
        }
    }

    function unpinTask(index) {
        if (pinnedTask.length > 0) {
            const taskToUnpin = pinnedTask[index];
            const filteredPinTasks = pinnedTask.filter((_, i) => i !== index);
            setPinnedTask(filteredPinTasks);
            setTasks([taskToUnpin, ...task]);
        }
    }

    function toggleCompletion(index, isPinned) {
        if (isPinned) {
            setPinnedTask(pinnedTask.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            ));
        } else {
            setTasks(task.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            ));
        }
    }

    function resetList() {
        setTasks([]);
        setPinnedTask([]);
    }

    return (
        <>
            <div className='todo-container'>
                <h1>ToDo List</h1>
                <InputComponent
                    newTask={newTask}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                    addTask={addTask}
                />
                <button
                    className='reset-button'
                    onClick={resetList}
                >
                    Reset List
                </button>
                <PinnedTaskListComponent
                    pinnedTasks={pinnedTask}
                    toggleCompletion={(index) => toggleCompletion(index, true)}
                    deleteTask={(index) => deleteTask(index, true)}
                    unpinTask={unpinTask}
                />
                <TaskListComponent
                    tasks={task}
                    toggleCompletion={(index) => toggleCompletion(index, false)}
                    deleteTask={(index) => deleteTask(index, false)}
                    moveTaskUp={moveTaskUp}
                    moveTaskDown={moveTaskDown}
                    PinToTop={PinToTop}
                />
            </div>
        </>
    );
}

export default ToDoList;
