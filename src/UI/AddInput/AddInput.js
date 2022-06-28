import React, {useEffect, useRef} from 'react';
import styles from './addInput.module.css'
const AddInput = ({setValue,sendValue,value,placeholder}) => {
    useEffect(()=>{
        input.current.placeholder = placeholder
    },[])
    const input = useRef(null)
    return (
        <div className={styles.addPanel}>
            <input type="text"
                   ref={input}
                   placeholder={'write task'}
                   autoComplete='off'
                   id='input'
                   onChange={(event)=>setValue(event.target.value)}
                   value={value || ""}
            />
            <span onClick={sendValue}> </span>
        </div>
    );
};

export default AddInput;