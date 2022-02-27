import React, {useState, useEffect} from 'react';
import { useInterval } from '@mantine/hooks';
import styles from './PomodoroPanel.module.css'
import Task from '../TodoPanel/TaskList/Task/Task';
import sound from '../electric_bounce.mp3'
import Slider from './Slider/Slider';

function PomodoroPanel(props) {
    const [seconds,setSeconds] = useState(0)
    const interval = useInterval(() =>
        setSeconds((s) => s - 1), 1000);
    const [valueOfSlider, setValueOfSlider] = useState(0);
    useEffect(()=>setSeconds(Math.floor(valueOfSlider*10)**2),[valueOfSlider])
    const audio = new Audio(sound);
    useEffect(()=>{
        // audio.play();
        interval.stop();
    },[!seconds])

    function setTimer(min){
        setSeconds(min*60)
        return interval.stop()
    }
    let time = (seconds/3600>=1?'1:':'')+
        (seconds/60%60<10?'0'+ Math.floor(seconds/60%60):Math.floor(seconds/60%60))+
        ':'+(seconds%60<10?'0'+seconds%60:seconds%60)
    document.title = seconds?time:'Time is over'
    return (
        <div className={styles.panel}>
            <div style={{width:'min(300px,100%)'}}>
                <h1>Pomodoro - timer</h1>
                <h1>{time}</h1>
                <Slider
                    valueOfSlider={valueOfSlider}
                    setValueOfSlider={(x)=>setValueOfSlider(x)}
                />
                <div className={styles.buttons}>
                    <button onClick={()=>setTimer(25)}>Pomodoro</button>
                    <button onClick={()=>setTimer(5)}>Short Break</button>
                    <button onClick={()=>setTimer(15)}>Long Break</button>

                    <button
                        disabled={seconds===0}
                        onClick={interval.toggle}
                        className={interval.active ?
                            styles.stopped__timer:styles.active__timer }
                    >
                        {interval.active ? 'Stop' : 'Start'} timer
                    </button>

                </div>
                {props.taskList.map(({text, isInPomodoro,isComplete},id) => {
                        if (isInPomodoro) {
                            return <Task change={() => props.changeIsComplete(id)}
                                         key={id}
                                         taskText={text}
                                         done={isComplete?true:false}
                                         toSelect={()=>props.toSelect(id)}
                                         selected={id===props.selectedId}
                            />
                        }else {return null}
                    }
                )}
            </div>
        </div>

    );
}
export default PomodoroPanel