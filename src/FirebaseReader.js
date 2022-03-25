
import { setDoc,  getDoc,doc} from 'firebase/firestore'
import db from './firebase'


export const takeDoc =  async () => {
    const docRef = doc(db,'todos','DBVOunupACg8e5HGCbFO')
    const noteSnapshot = await getDoc(docRef);
    const data = noteSnapshot.data()
    console.log(typeof JSON.parse(data.value))
    return JSON.parse(data.value)
}

export const setNewDoc = async (taskList) => {
    const docRef = doc(db,'todos','DBVOunupACg8e5HGCbFO')
    const payload = {value:JSON.stringify(taskList)}
    await setDoc(docRef,payload)
    console.log('set')
}
