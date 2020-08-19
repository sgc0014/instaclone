import { action, observable, computed, runInAction } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import firebase from './lib/firebase'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(typeof window === 'undefined')

let store
const db = firebase.firestore();
const auth =  firebase.auth();
class Store {
  @observable lastUpdate = 0
  @observable light = false
  @observable userInfo = null
  @observable async getPosts(){
    
   const result = await db.collection('posts').get().then(snapshot => {
     
      snapshot.forEach(doc => {this.array.push(doc.data())})
     
   })
  }

  async signInWithEmailPassword(userData){
    let {email,username,fullName,password} = userData
  
  const result = await  auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
    if(authUser){
      auth.onAuthStateChanged(user => {
        if(user){
          user.updateProfile({
            displayName:username
          });
         db.collection('users').doc(user.uid).set({email,username,fullName})
        }
      })
    }
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
    });
  }

 
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store()

 
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}