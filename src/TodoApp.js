import TodoPanel from "./TodoPanel/TodoPanel";
import PomodoroPanel from './PomodoroPanel/PomodoroPanel';
import React, {useEffect, useState} from 'react';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import {setNewDoc, takeDoc} from "./FirebaseReader";
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import useDebounceEffect from './customHooks';

class classTask {

    constructor(text) {
        this.timeToDo =  0
        this.isComplete =  false
        this.isInPomodoro =  false
        this.children = []
        this.text = text
        this.description = ''
        this.id = classTask.id++
    }
    static id = 0
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

    useDebounceEffect(() => {
        if (loading) return
        setNewDoc(taskList, user?.uid)
    }, [taskList, user?.uid])

    const signOut = async () => {
        const result = window.confirm('Вы хотите выйти?')
        if (result) {
            await signOut(auth)
        }
    }

    function addTask(value) {
        if (!value) return
        setTaskList([new classTask(value), ...taskList])
        setSelectedId(0)
    }

    function addChildTask(value) {
        if (!value) return
        const copyTaskList = taskList
        copyTaskList[selectedId] = {
            ...taskList[selectedId],
            children: [...taskList[selectedId].children, new classTask(value)]
        }
        setTaskList(copyTaskList)
        console.log(taskList)
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
                addChildTask={addChildTask}
                selectedId={selectedId}
                task={taskList[selectedId]}
                setSelectedId={setSelectedId}
                updateDescription={updateDescription}
                updateText={updateText}
                toChangeIsInPomodoro={() => toChangeIsInPomodoro(selectedId)}
                toChangeIsComplete={toChangeIsComplete}
                toDeleteTask={() => toDeleteTask(selectedId)}
                toSetTime={toSetTime}
            />
            <TodoPanel
                setIsPomodoroClose={(x) => setIsPomodoroClose(x)}
                signOut={signOut}
                selectedId={selectedId}
                taskList={taskList}
                toDeleteTask={(id) => toDeleteTask(id)}
                toSelect={(id) => toSelect(id)}
                createTask={value => addTask(value)}
                toChangeIsComplete={id => toChangeIsComplete(id)}
                toChangeIsInPomodoro={id => toChangeIsInPomodoro(id)}
            />
        </div>
    );
}

export default TodoApp