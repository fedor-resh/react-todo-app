import React from 'react';
import styles from './Task.module.css'

const Task = ({taskText, change,done=false,toSelect}) => {
    return (
        <div className={styles.task}>
            <div onClick={toSelect} className={styles.settingsOpen}/>
            <div onClick={change} className={done?styles.completed:styles.radio}/>
            <p >{taskText}</p>
        </div>
    );
};

export default Task;