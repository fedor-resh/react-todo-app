
import { useMove } from '@mantine/hooks';
import {useEffect} from 'react';
import styles from './Slider.module.css'

function Slider({
                    setValueOfSlider,
                    valueOfSlider,
                    stopTimer,
                    isTimePanelVisible=false,
                    timeToDo = 0,
                    selectedId
}) {
    const { ref } = useMove(({ x }) =>{setValueOfSlider(Math.round((x*10)**2 )*60)})

    const min = valueOfSlider/60
    useEffect(()=>setValueOfSlider(Math.round((timeToDo*10)**2 )*60),[selectedId])
    const time = (min/60>=1?'1:':'')+(min%60<10?'0'+ min%60:min%60)+ ':00'
    const value = (valueOfSlider/60)**0.5*10
    return (
        <>
            <div onClick={stopTimer} style={{paddingBottom:27}}>
                <div
                    ref={ref}
                    style={{
                        width: '100%',
                        height: 16,
                        backgroundColor:'#767676',
                        position: 'relative',
                        borderRadius:20,
                    }}
                >
                    {/* Filled bar */}
                    <div
                        style={{
                            width: `${value}%`,
                            height: 16,
                            backgroundColor: '#676767',
                            borderRadius:20,
                            borderBottomLeftRadius:20,
                            borderTopLeftRadius:20,
                        }}
                    />

                    {/* Thumb */}
                    <div className={styles.small__panel}
                        style={{
                            position: 'absolute',
                            left: `calc(${value}% - 8px)`,
                            top: 0,
                            width: 16,
                            height: 16,
                            borderRadius:20,
                            backgroundColor: '#4b4b4b',
                        }}
                    >
                        {isTimePanelVisible&&<div >
                            <p>{time}</p>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Slider