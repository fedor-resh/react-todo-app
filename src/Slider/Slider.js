
import { useMove } from '@mantine/hooks';
import styles from './Slider.module.css'

function Slider({
                    setValue,
                    value,
                    stopTimer,
                    isTimePanelVisible=false,
}) {
    const { ref } = useMove(({ x }) =>{
        setValue(Math.round(x*20)*5*60)
        stopTimer?.()
    })

    const min = value/60

    const time = (min/60>=1?'1:':'')+(min%60<10?'0'+ min%60:min%60)+ ':00'
    const val = value<=6000?(value/60):100
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
                            width: `${val}%`,
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
                            left: `calc(${val}% - 8px)`,
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