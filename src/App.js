import React from 'react';
import TodoApp from './TodoApp';
import {auth} from './firebase';
import {singInWithGoogle} from './FirebaseReader';
import {useAuthState} from 'react-firebase-hooks/auth';
import s from './App.module.css'


const App = () => {
    const [user] = useAuthState(auth)

    return (
        <div>
            {user

                ?<TodoApp/>
                :<div className={s.wrapper}>
                    <h2 className={s.btn} onClick={()=>singInWithGoogle(auth)}> войти</h2>
                </div>
            }
        </div>
    );
};

export default App;