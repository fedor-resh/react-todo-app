import React from 'react';
import styles from './Task.module.css'
import cross from '../../cross-svgrepo-com.svg'
import arrow from '../../right-arrow-svgrepo-com.svg'
const Task = ({
                  taskText,
                  change,
                  done=false,
                  toSelect,
                  selected=false,
                  close=false,
                  onArrow = false,
                  mins = 0,
                  rotate = false
}) => {
    const time = mins
        ?(mins/60>=1?Math.floor(mins/60) + 'h ':'')
        +(mins%60?((mins%60)+ 'm'):''):''
    return (
        <div className={selected?styles.task+' '+styles.selected:styles.task}>
            <div onClick={toSelect} className={styles.settingsOpen}/>
            <div onClick={change} className={done?styles.completed:styles.radio}/>
            {close&&<img onClick={()=>close()} src={cross} alt='cross' className={styles.cross}/>}
            {onArrow&&<img onClick={()=>onArrow()} src={arrow} alt='arrow'
                           className={styles.arrow+' '+(rotate?styles.rotate:'')}/>}
            <p className={styles.taskTime} style={done?{opacity:0}:{}}>{time}</p>
            <p className={styles.taskText}>{taskText}</p>
        </div>
    );
};

export default Task;