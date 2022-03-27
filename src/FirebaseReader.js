
import {doc, setDoc, getDoc} from 'firebase/firestore'
import {db,provider,auth} from './firebase'
import {signInWithPopup} from  'firebase/auth'


export const takeDoc =  async (uid) => {

    try {
        const docRef = doc(db,'todos',uid)
        const noteSnapshot = await getDoc(docRef);
        const data = noteSnapshot.data()
        console.log('take')
        return JSON.parse(data.value)
    }catch(err) {
        await setDoc(doc(db,'todos','hello'),{value:'[]'})
        console.log('id: '+uid)
        return JSON.parse('[]')
    }
}

export const setNewDoc = async (taskList,uid) => {
    const docRef = doc(db,'todos',uid)
    const payload = {value:JSON.stringify(taskList)}
    await setDoc(docRef,payload)
    console.log('set')
}

export const singInWithGoogle = async () => {
    provider.setCustomParameters({prompt: 'select_account'})
    signInWithPopup(auth, provider)
}
