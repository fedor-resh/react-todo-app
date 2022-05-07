import React, {useRef, useState} from 'react';
import s from './SignIn.module.css'
import {auth, provider} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'


const SignIn = () => {
    const [isAlreadyHaveAccount, setIsAlreadyHaveAccount] = useState(true)
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)



    function signInWithGoogle() {
        signInWithPopup(auth,provider)
            .catch(err => alert(err))
    }

    function handleSubmit(name) {
        if (isAlreadyHaveAccount) {
            signInWithEmailAndPassword(auth,email.current.value, password.current.value)
                .catch(err => console.error(err))
        } else {
            if (!name) return alert('enter name')
            createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
                .catch(err => console.error(err))
        }
    }

    return (
        <div>
            <div className={s.modal}>
                <center><h1>{isAlreadyHaveAccount ? 'enter' : 'create new account'}</h1></center>
                <center><input placeholder={'email'} ref={email} type="email"/></center>
                <center><input placeholder={'password'} ref={password} type='password'/></center>
                <center>
                    <button onClick={() => handleSubmit(name.current?.value ?? 'name')}>submit</button>
                </center>
                <center>
                    <button onClick={isAlreadyHaveAccount
                        ? () => setIsAlreadyHaveAccount(false)
                        : () => setIsAlreadyHaveAccount(true)}>
                        {isAlreadyHaveAccount
                            ? 'create new account'
                            : 'already have account'}
                    </button>
                </center>
                <center>
                    <button onClick={signInWithGoogle}>
                        sign in with google
                    </button>
                </center>
            </div>
        </div>

    );
};

export default SignIn;