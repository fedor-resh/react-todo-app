import React from 'react';
import TodoApp from './TodoApp';
import {auth} from './firebase';
import {singInWithGoogle} from './FirebaseReader';
import {useAuthState} from 'react-firebase-hooks/auth';
import s from './App.module.css'
import TodoPanel from './TodoPanel/TodoPanel';
import SignIn from './SignIn/SignIn';


const App = () => {
    const [user] = useAuthState(auth)

    return (
        <div>
            {user
                ? <TodoApp/>
                : <div className={s.wrapper}>
                    <SignIn/>
                </div>
            }
        </div>
    );
};

export default App;