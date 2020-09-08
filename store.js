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
  @observable userInfo = null;
  @observable unreadState = null;
  @observable comments = [];

  async changeunread(userId,otherId) {
    await firebase
    .firestore()
    .collection("chats")
    .doc(`${userId}`)
    .collection(`${otherId}`)
    .where("senderId", "==", otherId)
    .where("readStatus", "==", false)
    .onSnapshot((querySnap) => {
      let arr = [];
      querySnap.forEach((doc) => {
        console.log(doc.data());
        arr.push(doc.data());
      });
      if (!querySnap.empty) {
        
        console.log("tru");
     this.unreadState = true
      
      }
    })

  }
  async addPost(finalData, postPic) {
    let storageRef = firebase.storage().ref();
    let uploadTask = await storageRef
      .child(`posts/${postPic.name}`)
      .put(postPic)
      .then((snap) => {
        snap.ref.getDownloadURL().then(async function (downloadURL) {
          console.log("File available at", downloadURL);
          let post = {
            ...finalData,
            imgArr: [downloadURL],
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          };

          const final = await firebase
            .firestore()
            .collection("posts")
            .add(post)
            .then((doc) => {
              console.log("posted");
            });
        });
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  }
  @action async getMsg(userId, otherUserId) {
    const msgRef = db
      .collection("chats")
      .doc(`${userId}`)
      .collection(`${otherUserId}`);
    const msg = await msgRef.orderBy("timeStamp", "desc").onSnapshot(
      action("success", (querySnap) => {
        let data = [];

        let t = querySnap.forEach((doc) => {
          data.push(doc.data());
                    doc.ref.update({ readStatus: true });
        
        
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
            data.push({ ...doc.data(), id: doc.id });
          });
          this.posts = data;
        })
      );
  }
  @action async getComments(id) {
    const comment = await db
      .collection("comment")
      .where("postId", "==", id)
      .onSnapshot(
        action("success", (querySnap) => {
          let data = [];
          let t = querySnap.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          this.comments = data;
        })
      );
  }
  async likePost(username, postId, likeCount) {
    let postRef = firebase.firestore().collection("posts").doc(`${postId}`);
    const post = await firebase
      .firestore()
      .collection("likes")
      .add({ postId, liker: username })
      .then(async (doc) => {
        await postRef.update({ likeCount: likeCount + 1 });
      });
  }
  async unlikePost(username, postId, likeCount) {
    let postRef = firebase.firestore().collection("posts").doc(`${postId}`);

    await firebase
      .firestore()
      .collection("likes")
      .where("liker", "==", username)
      .where("postId", "==", postId)
      .limit(1)
      .get()
      .then(async function (data) {
        data.forEach((doc) => {
          doc.ref.delete().then(async (doc) => {
            await postRef.update({ likeCount: likeCount - 1 });
          });
        });
      });
  }
  async postComment(commentData) {
    const post = await firebase
      .firestore()
      .collection("comment")
      .add(commentData)
      .then((doc) => {
        console.log("commented");
      })
      .catch((err) => {
        console.log(err);
      });
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
  async getUserProfile(username) {
    await firebase
      .firestore()
      .collection(`users`)
      .where("username", "==", `${username}`)
      .get()
      .then(
        action("success", (querySnap) => {
          querySnap.forEach((doc) => {
            this.userInfo = doc.data();
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }
  async updateUserProfile(name, username, email, phoneNo, gender, bio, id) {
    await firebase
      .firestore()
      .collection(`users`)
      .doc(`${id}`)
      .update({ name, username, email, phoneNo, gender, bio })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
  async loginWithFacebook() {
    let err;
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);

        auth.onAuthStateChanged((user) => {
          if (user) {
            db.collection("users")
              .doc(user.uid)
              .set({
                email: user.email,
                username: user.displayName,
                fullName: user.displayName,
                photoUrl: user.photoURL,
              })
              .then((doc) => {
                console.log("created");
              });
          }
        });
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage);
        // ...
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
                .set({ email, username, fullName, photoURL })
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
