import TodoPanel from "./TodoPanel/TodoPanel";
import PomodoroPanel from './PomodoroPanel/PomodoroPanel';
import React, {useEffect, useState} from 'react';
import SettingsPanel from './SettingsPanel/SettingsPanel';


class TaskClass {
    constructor(text) {
        this.text = text
        this.isComplete = false
        this.isInPomodoro = false
        this.id = TaskClass.ownId++
        this.description = ''
        this.timeToDoMin = 0
        // this.date = new Date()
    }

    static ownId = 0
}

function App() {
    const [taskList, setTaskList] = useState(
        localStorage.taskList ? JSON.parse(localStorage.taskList) : [])
    const [selectedId, setSelectedId] = useState(undefined)
    const [val, setVal] = useState(0)
    useEffect(() => {
        localStorage.taskList = JSON.stringify(taskList)
        console.log(taskList)
    }, [taskList])

    function addTask(value) {
        if (value) {
            setTaskList([new TaskClass(value), ...taskList])
            setSelectedId(0)
        }
    }

    function changeIsComplete(id) {
        const taskListCopy = taskList.slice()
        taskListCopy[id].isComplete = !taskListCopy[id].isComplete
        setTaskList(taskListCopy)
    }

    function toChangeIsInPomodoro() {
        const taskListCopy = taskList.slice()
        taskListCopy[selectedId].isInPomodoro = !taskListCopy[selectedId].isInPomodoro
        setTaskList(taskListCopy)
    }

    function updateText(text) {
        const taskListCopy = taskList.slice()
        taskListCopy[selectedId].text = text
        setTaskList(taskListCopy)
    }

    function updateDescription(text) {
        const taskListCopy = taskList.slice()
        taskListCopy[selectedId].description = text
        setTaskList(taskListCopy)
    }

    function toSelect(id) {
        if (id === selectedId) {
            setSelectedId(undefined)
        } else {
            setSelectedId(id)
            setVal(0)
        }
    }

    function toDeleteTask() {
        const taskListCopy = taskList.slice()
        taskListCopy.splice(selectedId, 1)
        setTaskList(taskListCopy)
        setSelectedId(undefined)
    }

    function toSetTime(min) {
        if (selectedId) {
            const taskListCopy = taskList.slice()
            taskListCopy[selectedId].timeToDo = min
            setTaskList(taskListCopy)
        }
    }

    return (
        <div className="App">
            <PomodoroPanel
                taskList={taskList}
                selectedId={selectedId}
                changeIsComplete={id => changeIsComplete(id)}
                toSelect={(id) => toSelect(id)}
            />
            <SettingsPanel
                selectedId={selectedId}
                task={taskList[selectedId]}
                updateDescription={(text) => updateDescription(text)}
                updateText={(text) => updateText(text)}
                toChangeIsInPomodoro={() => toChangeIsInPomodoro()}
                changeIsComplete={id => changeIsComplete(id)}
                toDeleteTask={() => toDeleteTask()}
                toSetTime={(min) => toSetTime(min)}
            />
            <TodoPanel
                selectedId={selectedId}
                taskList={taskList}
                toSelect={(id) => toSelect(id)}
                addTask={value => addTask(value)}
                changeIsComplete={id => changeIsComplete(id)}
            />
        </div>
    );
}

export default App