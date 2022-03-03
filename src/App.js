import TodoPanel from "./TodoPanel/TodoPanel";
import PomodoroPanel from './PomodoroPanel/PomodoroPanel';
import React, {useEffect, useState} from 'react';
import SettingsPanel from './SettingsPanel/SettingsPanel';


class TaskClass {
    constructor(text) {
        this.text = text
        this.isComplete = false
        this.isInPomodoro = false
        this.id = Math.random()
        this.description = ''
        this.timeToDo = 0
        this.depthOfInheritance = 1

        // this.date = new Date()
    }
}

function App() {
    const [taskList, setTaskList] = useState(
        localStorage.taskList ? JSON.parse(localStorage.taskList) : [])
    const [selectedId, setSelectedId] = useState(undefined)
    const [isPomodoroClose, setIsPomodoroClose] = useState(true)
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

    function toChangeIsInPomodoro(id) {
        const taskListCopy = taskList.slice()
        taskListCopy[id].isInPomodoro = !taskListCopy[id].isInPomodoro
        setTaskList(taskListCopy)
    }

    function toClearIsInPomodoro(){
        const taskListCopy = taskList.map((itm)=>{
            itm.isInPomodoro = false
            return itm
        })

        setTaskList(taskListCopy)
        console.log(234)
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
        }
    }

    function toDeleteTask(id) {
        const taskListCopy = taskList.slice()
        taskListCopy.splice(id, 1)
        setTaskList(taskListCopy)
        setSelectedId(undefined)
    }

    function toSetTime(min) {
        if (selectedId!==undefined) {
            const taskListCopy = taskList.slice()
            taskListCopy[selectedId].timeToDo = min
            setTaskList(taskListCopy)
        }
    }

    return (
        <div className="App">
            <PomodoroPanel
                isPomodoroClose={isPomodoroClose}
                setIsPomodoroClose={(x)=>setIsPomodoroClose(x)}
                taskList={taskList}
                selectedId={selectedId}
                clear={toClearIsInPomodoro}
                toChangeIsInPomodoro={(id)=>toChangeIsInPomodoro(id)}
                changeIsComplete={id => changeIsComplete(id)}
                toSelect={(id) => toSelect(id)}
            />
            <SettingsPanel
                selectedId={selectedId}
                task={taskList[selectedId]}
                setSelectedId={(id)=>setSelectedId(id)}
                updateDescription={(text) => updateDescription(text)}
                updateText={(text) => updateText(text)}
                toChangeIsInPomodoro={() => toChangeIsInPomodoro(selectedId)}
                changeIsComplete={id => changeIsComplete(id)}
                toDeleteTask={() => toDeleteTask(selectedId)}
                toSetTime={(min) => toSetTime(min)}
            />
            <TodoPanel
                selectedId={selectedId}
                taskList={taskList}
                toDeleteTask={(id) => toDeleteTask(id)}
                toSelect={(id) => toSelect(id)}
                addTask={value => addTask(value)}
                changeIsComplete={id => changeIsComplete(id)}
            />
        </div>
    );
}

export default App