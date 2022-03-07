import React, {useState} from 'react';
import styles from './TodoPanel.module.css'
import Task from './Task/Task';

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
            <div className={styles.addPanel}>
                <input type="text"
                       id='input'
                       onChange={(event)=>setValue(event.target.value)}
                       value={value || ""}
                />
                <span onClick={() => sendValue()}> </span>
            </div>
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
                {props.taskList.map(({text, isComplete, id, timeToDo}, i) => {
                        if (isComplete) {
                            return <Task change={() => props.toChangeIsComplete(i)}
                                         done={true}
                                         key={id}
                                         taskText={text}
                                         toSelect={() => props.toSelect(i)}
                                         selected={i === props.selectedId}
                                         close={() => props.toDeleteTask(i)}
                                         mins={timeToDo}
                            />
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