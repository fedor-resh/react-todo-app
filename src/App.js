import TodoPanel from "./TodoPanel/TodoPanel";
import PomodoroPanel from './PomodoroPanel/PomodoroPanel';
import React, {useEffect, useState} from 'react';
import SettingsPanel from './SettingsPanel/SettingsPanel';


class classTask {
    constructor(text,deep = 1) {
        this.text = text
        this.description = ''
        this.depthOfInheritance = deep
        this.timeToDo = 0
        this.isComplete = false
        this.isInPomodoro = false
        this.id = Math.random()
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

    function createTask(value,deep) {
        if (value) {
            setTaskList([new classTask(value), ...taskList])
            setSelectedId(0)
        }
    }

    function toChangeIsComplete(id) {
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
                toChangeIsComplete={id => toChangeIsComplete(id)}
                toSelect={(id) => toSelect(id)}
            />
            <SettingsPanel
                selectedId={selectedId}
                task={taskList[selectedId]}
                setSelectedId={(id)=>setSelectedId(id)}
                updateDescription={(text) => updateDescription(text)}
                updateText={(text) => updateText(text)}
                toChangeIsInPomodoro={() => toChangeIsInPomodoro(selectedId)}
                toChangeIsComplete={id => toChangeIsComplete(id)}
                toDeleteTask={() => toDeleteTask(selectedId)}
                toSetTime={(min) => toSetTime(min)}
            />
            <TodoPanel
                selectedId={selectedId}
                taskList={taskList}
                toDeleteTask={(id) => toDeleteTask(id)}
                toSelect={(id) => toSelect(id)}
                createTask={value => createTask(value)}
                toChangeIsComplete={id => toChangeIsComplete(id)}
                toChangeIsInPomodoro={id => toChangeIsInPomodoro(id)}
            />
        </div>
    );
}

export default App