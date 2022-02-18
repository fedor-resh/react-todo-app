import React from 'react';
import styles from './TaskList.module.css'
import Task from './Task/Task';

const TaskList = ({taskList = [1,2,3,4,5]}) => {

    return (
        <div>
            <div className={styles.wrapper}>
                {taskList.map((el,id)=><Task key={id} taskText={el}/> )}
                <Task taskText='buy milk'/>
            </div>
        </div>
    );
};

export default TaskList;