import React, {useEffect} from 'react';
import { setDoc,  getDoc,doc} from 'firebase/firestore'
import db from './firebase'
const FirebaseReader = ({taskList,setTaskList}) => {
    useEffect(() =>{
        const docRef = doc(db,'todos','DBVOunupACg8e5HGCbFO')
        const takeDoc =  async () => {
            const noteSnapshot = await getDoc(doc(db, 'todos', 'DBVOunupACg8e5HGCbFO'));
            const data = noteSnapshot.data()
            console.log(data.value)
            setTaskList(JSON.parse(data.value))
        }
        takeDoc()
        const handleNew = async () => {
            const payload = {value:JSON.stringify(taskList)}
            await setDoc(docRef,payload)
        }
    return handleNew()
}, [])};

export default FirebaseReader;