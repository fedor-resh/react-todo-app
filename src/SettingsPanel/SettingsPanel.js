import React from 'react';
import styles from './SettingsPanel.module.css'
import './SettingsPanel.module.css'
import Slider from '../PomodoroPanel/Slider/Slider';
const SettingsPanel = (props) => {
    return (
        <div >
            <div className={styles.panel+' '+
                (props.selectedId!==undefined?styles.NotFade:styles.fade)}>
                <div style={{width:'min(300px,100%)',float:'right'}}>
                    <h1>Settings</h1>
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
                            val={props.val}
                            toSetSeconds={(min)=>props.toSetTime(min)}
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