import React, {useState} from 'react';
import styles from './TodoPanel.module.css'
import Task from '../UI/Task/Task';
import AddInput from "../UI/AddInput/AddInput";
import {renderTask} from "../UI/Task/renderTask";

function TodoPanel(props) {
    const [value,setValue] = useState('')
    document.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            sendValue()
        }
    })

    function sendValue() {
        props.createTask(value)
        setValue('')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                <button onClick={()=>props.signOut()}>Sign out</button>
                <button onClick={()=>{props.setIsPomodoroClose(true)}}>Pomodoro</button>
            </div>
            <AddInput
                sendValue={sendValue}
                setValue={setValue}
                value={value}
                placeholder='write task'
            />
            {props.taskList.map(({text, isComplete, id, timeToDo}, i) => {
                    if (!isComplete) {
                        return <Task change={() => props.toChangeIsComplete(i)}
                                     key={id}
                                     taskText={text}
                                     toSelect={() => props.toSelect(i)}
                                     selected={i === props.selectedId}
                                     mins={timeToDo}
                                     onArrow={() => props.toChangeIsInPomodoro(i)}
                        />
                    } else {
                        return null
                    }
                }
            )}
            <details>
                <summary>done</summary>
                {props.taskList.map((task, i) => {
                        if (task.isComplete) {
                            return renderTask({
                                ...task,
                                selectedId:props.selectedId,
                                toChangeIsComplete:props.toChangeIsComplete,
                                toSelect:props.toSelect,
                                toDeleteTask:props.toDeleteTask,
                            },i)
                            // <Task change={() => props.toChangeIsComplete(i)}
                            //              done={true}
                            //              key={id}
                            //              taskText={text}
                            //              toSelect={() => props.toSelect(i)}
                            //              selected={i === props.selectedId}
                            //              close={() => props.toDeleteTask(i)}
                            //              mins={timeToDo}
                            // />
                        } else {
                            return null
                        }
                    }
                )}
            </details>
        </div>
    );
    
}

export default TodoPanel;