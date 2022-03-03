import React from 'react';
import styles from './Task.module.css'
import cross from '../../cross-svgrepo-com.svg'
const Task = ({taskText,
                  change,done=false,
                  toSelect,
                  selected=false,
                  close=false
}) => {
    return (
        <div className={selected?styles.task+' '+styles.selected:styles.task}>
            <div onClick={toSelect} className={styles.settingsOpen}/>
            <div onClick={change} className={done?styles.completed:styles.radio}/>
            {close&&<img onClick={()=>close()} src={cross} alt='cross' className={styles.cross}/>}
            <p>{taskText}</p>
        </div>
    );
};

export default Task;