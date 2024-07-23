import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import PinnedTaskList from './components/PinnedTaskList';

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
        <div className='todo-container'>
            <h1>ToDo List</h1>

            <TaskInput
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

            <PinnedTaskList
                pinnedTasks={pinnedTask}
                toggleCompletion={(index) => toggleCompletion(index, pinnedTask, setPinnedTask)}
                deleteTask={(index) => deleteTask(index, pinnedTask, setPinnedTask)}
                unpinTask={unpinTask}
            />

            <TaskList
                tasks={task}
                toggleCompletion={(index) => toggleCompletion(index, task, setTasks)}
                deleteTask={(index) => deleteTask(index, task, setTasks)}
                moveTaskUp={moveTaskUp}
                moveTaskDown={moveTaskDown}
                PinToTop={PinToTop}
            />
        </div>
    );
}

export default ToDoList;
