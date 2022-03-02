import React, {useState, useEffect} from 'react';
import {useInterval} from '@mantine/hooks';
import styles from './PomodoroPanel.module.css'

import Task from '../TodoPanel/TaskList/Task/Task';
import sound from '../electric_bounce.mp3'
import Slider from '../Slider/Slider';

import cross from '../cross-svgrepo-com.svg'
function PomodoroPanel(props) {
    const [seconds, setSeconds] = useState(0)
    const interval = useInterval(() =>
        setSeconds((s) => s - 1), 1000);
    const audio = new Audio(sound);
    useEffect(() => {
        if(!seconds){
            interval.stop();
            audio.play();
        }
        console.log(props.taskList.reduce((sumTime,{timeToDo})=>sumTime+timeToDo,0))
    }, [!seconds])

    useEffect(()=>{
        time = props.taskList
            .filter(({isInPomodoro,isComplete})=>isInPomodoro&&!isComplete)
            .reduce((sumTime,{timeToDo})=>sumTime+timeToDo,0)
        setTimer(time)

    },[props.taskList])

    function setTimer(min) {
        if (min) {
            setSeconds(min * 60)
        }
        return interval.stop()
    }

    let time = (seconds / 3600 >= 1 ? Math.floor(seconds / 3600 ) + ':': '') +
        (seconds / 60 % 60 < 10 ? '0' + Math.floor(seconds / 60 % 60) : Math.floor(seconds / 60 % 60)) +
        ':' + (seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60)
    document.title = seconds ? time : 'Time is over'
    return (
        <div className={styles.panel + ' ' +
            (props.isPomodoroClose ? styles.NotFade : styles.fade)}>
            <img onClick={()=>props.setIsPomodoroClose(false)} className={styles.close__btn} src={cross} alt=""/>
            <div style={{width: 'min(300px,100%)'}}>
                <h1>Pomodoro - timer</h1>
                <h1>{time}</h1>
                <Slider
                    value={seconds}
                    setValue={(x) => setSeconds(x)}
                    stopTimer={() => setTimer()}
                />
                <div className={styles.buttons}>
                    <button onClick={() => setTimer(25)}>Pomodoro</button>
                    <button onClick={() => setTimer(5)}>Short Break</button>
                    <button onClick={() => setTimer(15)}>Long Break</button>

                    <button
                        disabled={seconds === 0}
                        onClick={interval.toggle}
                        className={interval.active ?
                            styles.stopped__timer : ''}
                    >
                        {interval.active ? 'Stop' : 'Start'} timer
                    </button>
                </div>
                <button style={{marginBottom:10}} onClick={()=>props.clear()}>Clear</button>
                {props.taskList.map(({text, isInPomodoro, isComplete}, id) => {
                        if (isInPomodoro) {
                            return <Task change={() => props.changeIsComplete(id)}
                                         key={text}
                                         taskText={text}
                                         done={!!isComplete}
                                         toSelect={() => props.toSelect(id)}
                                         selected={id === props.selectedId}
                            />
                        } else {
                            return null
                        }
                    }
                )}
            </div>
        </div>

    );
}

export default PomodoroPanel