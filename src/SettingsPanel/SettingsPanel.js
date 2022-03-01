import React, {useEffect, useState} from 'react';
import styles from './SettingsPanel.module.css'
import './SettingsPanel.module.css'
import Slider from '../PomodoroPanel/Slider/Slider';
const SettingsPanel = (props) => {
    const [seconds,setSeconds] = useState(0)
    useEffect(()=>{
        props.toSetTime(seconds/60)
    },[Math.round(seconds/60)])
    useEffect(()=> setSeconds(Math.round(props.task?props.task.timeToDo*60:0)),
        [props.selectedId])
    return (
        <div >
            <div className={styles.panel+' '+
                (props.selectedId!==undefined?styles.NotFade:styles.fade)}>
                <button onClick={()=>props.setSelectedId(undefined)}
                        className={styles.close__btn}>
                    close
                </button>
                <div style={{width:'min(300px,100%)',float:'right'}}>
                    <h1 >Settings</h1>
                    <input
                        value={props.task?props.task.text:''}
                        onChange={(el)=>
                            props.updateText(el.target.value)}
                    />
                    <p>description</p>
                    <textarea
                        value={props.task?props.task.description:''}
                        onChange={(el)=>
                            props.updateDescription(el.target.value)}
                    />
                    <div style={{height:20}}/>
                        <Slider
                            value={seconds}
                            setValue={(x)=>setSeconds(x)}
                            timeToDo={props.task?props.task.timeToDo:0}
                            selectedId={props.selectedId}
                            isTimePanelVisible={true}
                        />
                    <button onClick={props.toDeleteTask}>
                        Delete
                    </button>
                    <button onClick={props.toChangeIsInPomodoro}>
                        To pomodoro panel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;