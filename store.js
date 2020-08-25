import { action, observable, computed, runInAction, get } from "mobx";
import { useStaticRendering } from "mobx-react";
import { useMemo } from "react";
import firebase from "./lib/firebase";
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(typeof window === "undefined");

let store;
const db = firebase.firestore();
const auth = firebase.auth();
class Store {
  @observable chats = [];

  @action async getMsg(user, otherUser) {
    const msg = await db
      .collection("chats")
      .doc(`${user}`)
      .collection(`${otherUser}`)
      .orderBy("timeStamp", "desc")
      .onSnapshot(
        action("success", (querySnap) => {
          let data = [];
          let t = querySnap.forEach((doc) => {
            data.push(doc.data());
          });
          this.chats = data;
        })
      );
  }
  async createUserWithEmailAndPassword(userData) {
    let { email, username, fullName, password } = userData;
    let photoUrl = "/static/users/user1.jpg";

    const result = await auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          auth.onAuthStateChanged((user) => {
            if (user) {
              user.updateProfile({
                displayName: username,
              });
              db.collection("users")
                .doc(user.uid)
                .set({ email, username, fullName })
                .then((doc) => {
                  console.log("created");
                });
            }
          });
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  }
  async signInUserWithEmailAndPassword(userData) {
    let { email, password } = userData;

    const result = await auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  }
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store();

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
