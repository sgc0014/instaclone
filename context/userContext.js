import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../lib/firebase";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(false);
  const [otherUsers, setotherUsers] = useState([]);
  const [loadingotherUser, setloadingotherUser] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          setAuthentication(true);
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;

          const userDoc = await firebase
            .firestore()
            .doc(`users/${uid}`)
            .get()
            .then((data) => data.data());
          setUser({ ...userDoc, id: uid });
        } else {
          setUser(null);
          setAuthentication(false);
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .onSnapshot(function (querySnapshot) {
        let data = [];
        querySnapshot.forEach(function (doc) {
          data.push(doc.data());
        });

        setotherUsers(data);
        setloadingotherUser(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loadingUser, otherUsers, loadingotherUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorhands the context!
export const useUser = () => useContext(UserContext);
