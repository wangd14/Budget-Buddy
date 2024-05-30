import firebase_app from "../config"
import { deleteUser, getAuth } from "firebase/auth"

const auth = getAuth(firebase_app)
const user = auth.currentUser;

export default async function deleteAccount() {

    let result = null, error = null
    try {
      result = await deleteUser(user)
    } catch (e) {
      error = e
    }

    return { result, error }
}