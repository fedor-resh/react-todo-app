import TodoPanel from "./TodoPanel/TodoPanel";
import PomodoroPanel from './PomodoroPanel/PomodoroPanel';
import React, {useEffect, useState} from 'react';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import {takeDoc, setNewDoc} from "./FirebaseReader";
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth'

class classTask {
    constructor(text, deep = 1) {
        this.text = text
        this.description = ''
        this.depthOfInheritance = deep
        this.timeToDo = 0
        this.isComplete = false
        this.isInPomodoro = false
        this.id = Math.random()
    }
}

function TodoApp() {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(true)
    const [taskList, setTaskList] = useState([])

    const [selectedId, setSelectedId] = useState(undefined)
    const [isPomodoroClose, setIsPomodoroClose] = useState(true)

    const getData = async (id) => {
        setTaskList(await takeDoc(id))
        setLoading(false)
    }
    useEffect(() => {
        console.log(user?.uid)
        getData(user?.uid)
        return setLoading(true)
    }, [user])

    useEffect(() => {
        if (!loading) {
            setNewDoc(taskList, user?.uid)
            setLoading(true)
            setTimeout(()=>setLoading(false),200)
        }
    }, [ taskList, user?.uid])

    const signout = async () => {
        const result = window.confirm('Вы хотите выйти?')
        if (result) {
            await signOut(auth)
        }
    }
    function createTask(value) {
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
        setIsPomodoroClose(true)
        const taskListCopy = taskList.slice()
        taskListCopy[id].isInPomodoro = !taskListCopy[id].isInPomodoro
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
        }
    }

    function toDeleteTask(id) {
        const taskListCopy = taskList.slice()
        taskListCopy.splice(id, 1)
        setTaskList(taskListCopy)
        setSelectedId(undefined)
    }

    function toSetTime(min) {
        if (selectedId !== undefined) {
            const taskListCopy = taskList.slice()
            taskListCopy[selectedId].timeToDo = min
            setTaskList(taskListCopy)
        }
    }

    return (
        <div className="App">
            <PomodoroPanel
                isPomodoroClose={isPomodoroClose}
                setIsPomodoroClose={(x) => setIsPomodoroClose(x)}
                taskList={taskList}
                selectedId={selectedId}
                toChangeIsInPomodoro={(id) => toChangeIsInPomodoro(id)}
                toChangeIsComplete={id => toChangeIsComplete(id)}
                toSelect={(id) => toSelect(id)}
            />
            <SettingsPanel
                selectedId={selectedId}
                task={taskList[selectedId]}
                setSelectedId={(id) => setSelectedId(id)}
                updateDescription={(text) => updateDescription(text)}
                updateText={(text) => updateText(text)}
                toChangeIsInPomodoro={() => toChangeIsInPomodoro(selectedId)}
                toChangeIsComplete={id => toChangeIsComplete(id)}
                toDeleteTask={() => toDeleteTask(selectedId)}
                toSetTime={(min) => toSetTime(min)}
            />
            <TodoPanel
                setIsPomodoroClose={(x) => setIsPomodoroClose(x)}
                signOut={()=>{signout()}}
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

export default TodoApp