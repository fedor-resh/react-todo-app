import React from 'react';
import styles from './Task.module.css'

const Task = ({
    taskText,
    completed = false
              }) => {
    return (
        <div className={styles.task}>
            <div className={styles.radio}></div>
            <p>{taskText}</p>
        </div>
    );
};

export default Task;