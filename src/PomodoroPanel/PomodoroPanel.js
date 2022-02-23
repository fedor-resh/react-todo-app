import React, {useState, useEffect} from 'react';
import { useInterval } from '@mantine/hooks';
import styles from './PomodoroPanel.module.css'
import Task from '../TodoPanel/TaskList/Task/Task';
import sound from '../electric_bounce.mp3'

function PomodoroPanel(props) {
    const [seconds, setSeconds] = useState(3);
    const interval = useInterval(() => setSeconds((s) => s - 1), 1000);
    const audio = new Audio(sound);
    useEffect(()=>{
        audio.play();
        interval.stop();
    },[!seconds])


    function setTimer(min){
        setSeconds(min*60)
        return interval.stop()
    }
    let time = (seconds/60<10?'0'+ Math.floor(seconds/60):Math.floor(seconds/60))+':'+(seconds%60<10?'0'+seconds%60:seconds%60)
    document.title = seconds?time:'Time is over'
    return (
        <div className={styles.panel}>
            <div style={{width:'min(300px,100%)'}}>
                <h1>Pomodoro - timer</h1>
                <h1>{time}</h1>
                <div className={styles.buttons}>
                    <button onClick={()=>setTimer(25)}>Pomodoro</button>
                    <button onClick={()=>setTimer(5)}>Short Break</button>
                    <button onClick={()=>setTimer(15)}>Long Break</button>

                    <button
                        disabled={seconds===0}
                        onClick={interval.toggle}
                        color={interval.active ? 'red' : 'teal'}
                        variant="light"
                        className={interval.active ?styles.stopped__timer:styles.active__timer }
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
                            />
                        }else {return null}
                    }
                )}
            </div>
        </div>

    );
}
export default PomodoroPanel