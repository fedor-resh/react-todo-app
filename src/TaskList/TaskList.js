import React from 'react';
import styles from './TaskList.module.css'
import Task from './Task/Task';

const TaskList = () => {
    return (
        <div>
            <div className={styles.wrapper}>
                <Task taskText='buy milk'/>
            </div>
        </div>
    );
};

export default TaskList;