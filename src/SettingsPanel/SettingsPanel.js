import React from 'react';
import styles from './SettingsPanel.module.css'
import './SettingsPanel.module.css'
const SettingsPanel = (props) => {
    return (
        <div className={props.selectedId!==undefined?styles.panel+' '+styles.NotFade:styles.fade+' '+styles.panel}>


            <div className={styles.panel}>
                <div style={{width:'min(300px,100%)',float:'right'}}>
                    <h1>Settings</h1>
                    <input
                        value={props.task?props.task.text:''}
                        onChange={(el)=>props.updateText(el.target.value)}
                    />
                    <p>description</p>
                    <textarea></textarea>
                    <button onClick={props.toChangeIsInPomodoro}>To pomodoro panel</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;