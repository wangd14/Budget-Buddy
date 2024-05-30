import React, { useEffect, useState } from "react";
import Link from "next/link";
import logOut from "@/firebase/auth/logout"
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInbox, faSignOut, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/AuthContext";

const defaultProps: Props = {
  showProfile: false,
  isProfilePage: false,
}

type Props = {
  showProfile?: boolean 
  isProfilePage?: boolean
}

type message = {
  title: string,
  text: string,
  time: number,
  link: string
}

export default function Navbar(props: Props = {...defaultProps}) {

  const [msgsPopUp,setMsgsPopUp] = useState<boolean>(false)
  const [messages,setMessages] = useState<message[]>([])

  const {user}: any = useAuthContext()
  const router = useRouter()
  const logUserOut = async () => {
    console.log("hellooo i am coming to log out now");
    const {result, error} = await logOut()
    console.log("response: ",result);
    console.log("error: ",error);
    router.push('/');
  }
  // useEffect(() => {
  //   const fetchMsgs = async () => {
  //     const response = await fetch(
  //       'http://localhost:3000/user/'+user.uid
  //     );
  //     const data = await response.json();
  //     const inviteMsgs = await Promise.all(
  //       data.data.msgs.map(async (msg: message) => {
  //         const returnData = {
  //           title: msg.title,
  //           text: msg.text,
  //           time: msg.time,
  //           link: msg.link
  //         };
  //         return returnData;
  //       })
  //     );
  //     setMessages(inviteMsgs);
  //   };
  //   fetchMsgs();
  // }, []);

  async function getMessages(){
    const response: Response = await fetch('http://localhost:3000/user/'+user.uid+'?token=token');
    const data = await response.json()
    setMessages(data.data.msgs)
  }


  return (
    <nav className="flex border-b-4 border-b-white py-2 items-center">
      <Link href="../welcome" className="items-center flex flex-1 ml-4">
        <p className="text-4xl font-extrabold">Budget Buddy</p>
      </Link>

      {props.showProfile && !props.isProfilePage && (<div className="flex items-center justify-end flex-1">
        <FontAwesomeIcon icon={faInbox} onClick={()=>{setMsgsPopUp(true);/*getMessages()*/}} className="mr-4 text-2xl cursor-pointer rounded-lg hover:bg-white hover:text-black p-1"/>
        <Link href="../profile"
          className="text-white font-medium rounded-2xl px-3 mr-4 float-right border-white border-2 hover:cursor-pointer hover:bg-white hover:text-sky-900 ">
          <FontAwesomeIcon icon={faUser} className="sm:hidden" />
          <p className="hidden sm:block">Profile</p>
        </Link>
      </div>)}
      {props.isProfilePage && (
        <button onClick={logUserOut} className="text-white font-medium rounded-2xl px-3 mr-4 float-right border-white border-2 hover:cursor-pointer hover:bg-white hover:text-sky-900 ">
          <FontAwesomeIcon icon={faSignOut} className="sm:hidden"/>
          <p className="hidden sm:block">Logout?</p>
        </button>
      )}
      {msgsPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Messages</h2>
              <FontAwesomeIcon icon={faX} onClick={()=>setMsgsPopUp(false)} className="text-xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded px-1" />
            </div>
            <hr className="mb-4"/>
            {messages.map((message,index) => (<div key={index}>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">{message.title}</p>
                <p className="italic">{new Date(message.time).toLocaleString()}</p>
              </div>
              <p className="py-1 px-2 border rounded-md bg-black/70 mb-2">{message.text}</p>
              {message.link && (<div className="flex w-full justify-between gap-2">
                <div className="flex gap-2 items-center w-1/2 bg-green-500 font-bold py-2 px-4 rounded hover:bg-green-700 cursor-pointer">
                  <FontAwesomeIcon icon={faCheck} className="text-2xl scale-y-1 cursor-pointer" />
                  <p>Accept</p>
                </div>
                <div className="flex gap-2 items-center w-1/2 bg-red-600  font-bold py-2 px-4 rounded hover:bg-red-800 cursor-pointer">
                  <FontAwesomeIcon icon={faX} className="text-2xl scale-y-1 cursor-pointer" />
                  <p>Reject</p>
                </div>

              </div>)}
            </div>))}
          </div>
            
        </div>
      )}
    </nav>
  );
}
