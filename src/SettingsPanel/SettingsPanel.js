import React, {useEffect, useState} from 'react';
import styles from './SettingsPanel.module.css'
import './SettingsPanel.module.css'
import Slider from '../Slider/Slider';
import cross from '../assets/cross-svgrepo-com.svg';
import AddInput from "../UI/AddInput/AddInput";
const SettingsPanel = (props) => {
    const [seconds,setSeconds] = useState(0)
    const [childInput, setChildInput] = useState('')
    useEffect(()=>{
        props.toSetTime(seconds/60)
    },[Math.round(seconds/60)])
    useEffect(()=> setSeconds(Math.round(props.task?.timeToDo*60??0)),
        [props.selectedId])
    return (
        <div >
            <div className={styles.panel+' '+
                (props.selectedId!==undefined?styles.NotFade:styles.fade)}>
                <img onClick={()=>props.setSelectedId(undefined)} className={styles.close__btn} src={cross} alt=""/>

                <div style={{width:'min(300px,100%)',float:'right'}}>
                    <h1 >Settings</h1>
                    <input
                        value={props.task?.text??''}
                        onChange={(el)=>
                            props.updateText(el.target.value)}
                    />
                    <div style={{margin:'10px 0 0 10px'}}>
                        <AddInput
                            setValue={setChildInput}
                            value={childInput}
                            sendValue={()=>props.addChildTask(childInput)}
                            placeholder='write child task'
                        />
                    </div>
                    <p>description</p>
                    <textarea
                        value={props.task?.description ?? ''}
                        onChange={(el)=>
                            props.updateDescription(el.target.value)}
                    />
                    <div style={{height:20}}/>
                        <Slider
                            value={seconds}
                            setValue={(x)=>setSeconds(x)}
                            timeToDo={props.task?.timeToDo??0}
                            selectedId={props.selectedId}
                            isTimePanelVisible={true}
                        />
                    <button onClick={props.toDeleteTask}>
                        Delete
                    </button>
                    <button onClick={props.toChangeIsInPomodoro}>
                        To pomodoro panel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;