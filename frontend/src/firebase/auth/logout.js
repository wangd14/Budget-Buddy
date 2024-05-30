import firebase_app from "../config"
import { getAuth, signOut } from "firebase/auth"

const auth = getAuth(firebase_app)

export default async function logOut() {
    let result = null, error = null
    signOut(auth).then(() => {
      // Sign-out successful.
      result = "yippe";
    }).catch((error) => {
      // An error happened.
      result = "error happened.";
      error = error;
    });
    return { result, error }
}