import React from 'react';
import styles from './Task.module.css'
import cross from '../../cross-svgrepo-com.svg'
const Task = ({taskText,
                  change,
                  done=false,
                  toSelect,
                  selected=false,
                  close=false,
                  mins = 0
}) => {
    const time = mins?(mins/60>=1?'1h ':'')+(mins%60?((mins%60)+ 'm'):''):''
    return (
        <div className={selected?styles.task+' '+styles.selected:styles.task}>
            <div onClick={toSelect} className={styles.settingsOpen}/>
            <div onClick={change} className={done?styles.completed:styles.radio}/>
            {close&&<img onClick={()=>close()} src={cross} alt='cross' className={styles.cross}/>}
            <p className={styles.taskTime} style={done?{opacity:0}:{}}>{time}</p>
            <p className={styles.taskText}>{taskText}</p>
        </div>
    );
};

export default Task;