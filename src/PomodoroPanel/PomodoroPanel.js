import React, {useState, useEffect} from 'react';
import {useInterval} from '@mantine/hooks';
import styles from './PomodoroPanel.module.css'

import Task from '../TodoPanel/Task/Task';
import sound from '../electric_bounce.mp3'
import Slider from '../Slider/Slider';

import cross from '../cross-svgrepo-com.svg'
function PomodoroPanel(props) {
    const [seconds, setSeconds] = useState(0)
    const [title, setTitle] = useState(' — Time to work')
    const interval = useInterval(() =>
        setSeconds((s) => s - 1), 1000);
    const audio = new Audio(sound);
    useEffect(() => {
        if(!seconds&&interval.active){
            interval.stop();
            return audio.play();
        }
    }, [!seconds])

    useEffect(()=>{
        if(!interval.active){
            time = props.taskList
                .filter(({isInPomodoro,isComplete})=>isInPomodoro&&!isComplete)
                .reduce((sumTime,{timeToDo})=>sumTime+timeToDo,0)
            setTimer(time)
        }
    },[props.taskList])

    function setTimer(min,text = '') {
        if (min!==null) {setSeconds(min * 60)}
        else{setTitle(' — Time to focus!')}
        if(text){setTitle(text)}
        return interval.stop()
    }

    let time = (seconds / 3600 >= 1 ? Math.floor(seconds / 3600 ) + ':': '') +
        (seconds / 60 % 60 < 10 ? '0' + Math.floor(seconds / 60 % 60) : Math.floor(seconds / 60 % 60)) +
        ':' + (seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60)
    document.title = seconds ? (interval.active?time + title:time + ' — Timer stopped') : 'Time is over'
    return (
        <div className={styles.panel + ' ' +
            (props.isPomodoroClose ? styles.NotFade : styles.fade)}>
            <img onClick={()=>props.setIsPomodoroClose(false)}
                 className={styles.close__btn} src={cross} alt=""/>
            <div style={{width: 'min(300px,100%)'}}>
                <h1>Pomodoro - timer</h1>
                <h1>{time}</h1>
                <Slider
                    value={seconds}
                    setValue={(x) => setSeconds(x)}
                    stopTimer={() => setTimer(null)}
                />
                <div className={styles.buttons}>
                    <button onClick={() => setTimer(25,' — Time to work!')}>Pomodoro</button>
                    <button onClick={() => setTimer(5, ' — Time to chill')}>Short Break</button>
                    <button onClick={() => setTimer(15, ' — Time to chill')}>Long Break</button>

                    <button
                        disabled={seconds === 0}
                        onClick={interval.toggle}
                        className={interval.active ?
                            styles.stopped__timer : ''}
                    >
                        {interval.active ? 'Stop' : 'Start'} timer
                    </button>
                </div>
                {props.taskList.map(({text, isInPomodoro, isComplete,id,timeToDo}, i) => {
                        if (isInPomodoro) {
                            return <Task change={() => props.changeIsComplete(i)}
                                         onArrow={()=>props.toChangeIsInPomodoro(i)}
                                         rotate={true}
                                         key={id}
                                         taskText={text}
                                         done={!!isComplete}
                                         toSelect={() => props.toSelect(i)}
                                         selected={i === props.selectedId}
                                         mins = {timeToDo}
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