
import { useMove } from '@mantine/hooks';
import {useEffect, useState} from 'react';
import styles from './Slider.module.css'

function Slider({
                    toSetSeconds,
                    isTimePanelVisible=false,
                    timeToDo = 0,
                    selectedId
}) {
    const [value, setValue] = useState(0.2);
    const { ref } = useMove(({ x }) => setValue(x));

    const min = Math.round((value*10)**2)
    useEffect(()=>{toSetSeconds(min)},[min])
    useEffect(()=>{setValue((timeToDo**0.5)/10)},[selectedId])
    const time = (min/60>=1?'1:':'')+(min%60<10?'0'+ min%60:min%60)+ ':00'
    return (
        <>
            <div style={{paddingBottom:27}}>
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
                            width: `${value * 100}%`,
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
                            left: `calc(${value * 100}% - 8px)`,
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