import { action, observable, computed, runInAction } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import firebase from './lib/firebase'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(typeof window === 'undefined')

let store

class Store {
  @observable lastUpdate = 0
  @observable light = false
  @observable array = ['false']
  @observable async getPosts(){
     const db = firebase.firestore()
   const result = await db.collection('posts').get().then(snapshot => {
     
      snapshot.forEach(doc => {this.array.push(doc.data())})
     
   })
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