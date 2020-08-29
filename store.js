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
  @observable posts = [];
  @observable error = null;

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
  @action async getPosts() {
    const post = await db
      .collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot(
        action("success", (querySnap) => {
          let data = [];
          let t = querySnap.forEach((doc) => {
            data.push(doc.data());
          });
          this.posts = data;
        })
      );
  }
  async changePP(data) {
    console.log("1", data);
    let err;
    const upload = await firebase
      .storage()
      .ref()
      .child(`/users/${data.pp.name}`)
      .put(data.pp)
      .then(function (snap) {
        console.log("2");
        snap.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          firebase
            .firestore()
            .collection("users")
            .doc(`${data.id}`)
            .update({ photoUrl: `${downloadURL}` });
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        err = errorMessage;
      });
    this.error = err;
    console.log(this.error);
  }
  async createUserWithEmailAndPassword(userData) {
    let { email, username, fullName, password } = userData;
    let photoUrl = "/static/users/user1.jpg";
    let err;

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
        err = errorMessage;
        // ...
      });
    this.error = err;
    console.log(this.error);
  }
  async signInUserWithEmailAndPassword(userData) {
    let { email, password } = userData;
    let err;
    const result = await auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        err = errorMessage;
        // ...
      });
    this.error = err;
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
