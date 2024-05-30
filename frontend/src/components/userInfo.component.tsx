"use client";

import React from "react";
import Image from "next/image";
import pfp from "@/images/pfp.webp";
import pfphover from "@/images/pfphover.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "flowbite-react";
import { useState,useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type msg = {
  link: string,
  text: string,
  time: number,
  title: string,
}

const defaultUsr: user = {
  email: '',
  exists: false,
  fname: '',
  lname: '',
  msgs: [],
  orgs: [],
  uid: ''
}


type user = {
  email: string,
  exists: boolean,
  fname: string,
  lname: string,
  msgs: Array<msg>,
  orgs: Array<number>,
  uid: string
}



export default function UserInfo() {
  //user must be logged in to view this page
  const {user}: any = useAuthContext()
  const router = useRouter()

  //user data to be called from the api
  const [userData, setUserData] = useState<user>(defaultUsr);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [defaultImage, setDefaultImage] = useState(pfp);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const [newFirstName, setNewFirstName] = useState<string>('');
  const [newLastName, setNewLastName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      await fetch('http://localhost:3000/user/'+user.uid+'?token=token', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          fname: newFirstName,
          lname: newLastName,
        })
      });
    } catch(error) {
      console.log(error);
    }
    setNewFirstName('');
    setNewLastName('');
    setShowPopup(false);
    setShowForm(true);
  }

  useEffect(() => {
    //check if user is logged in
    if (!user) router.push("/")
    else {
      const fetchData = async () => {
        const response = await fetch('http://localhost:3000/user/'+user.uid+'?token'+user.accessToken);
        const data = await response.json();
        setUserData(data.data);
      };
      fetchData();
    }
  }, [router,user]);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-8 mx-auto">
        <input type="file"
          id="profile_pic"
          name="profile_pic"
          accept=".jpg, .jpeg, .png"
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              setSelectedImage(event.target.files[0]);
            }
          }}
          hidden
        />
        <label htmlFor="profile_pic" className="w-fit">
          <Image unoptimized id="pfp" src={selectedImage != null ? URL.createObjectURL(selectedImage) : defaultImage} width={100} height={100}
            alt="pfp"
            className="rounded-full object-cover"
            onMouseOver={() => {
              setDefaultImage(pfphover);
            }}
            onMouseOut={() => {
              setDefaultImage(pfp);
            }}
          ></Image>
        </label>
        {selectedImage && (
          <button className="w-fit text-red-500" onClick={() => setSelectedImage(null)} >
            Remove Profile Image
          </button>
        )}
        <div className="flex flex-col sm:flex-row justify-content-space-between w-full ">
          <div className="flex-column justify-content-space-around w-full m-1">
            <p><strong>Personal Info:</strong>&nbsp;</p>
            <div className="flex p-2 border-2 border-white">
              <p><strong>First Name:</strong>&nbsp;</p>
              <p>{userData?userData.fname:`First Name`}</p>
            </div>
            <div className="flex p-2 border-l-2 border-r-2 border-b-2 border-white">
              <p><strong>Last Name:</strong>&nbsp;</p>
              <p>{userData?userData.lname:"Last Name"}</p>
            </div>
            <div className="flex p-2 border-l-2 border-r-2 border-b-2 border-white">
              <p><strong>Email:</strong>&nbsp;</p>
              <p>{userData?userData.email:"Email"}</p>
            </div>
            <div className="flex p-2 border-l-2 border-r-2 border-b-2 border-white">
              <p><strong>Account Created:</strong>&nbsp;</p>
              <p>{user?user.metadata.creationTime:""}</p>
            </div>
            <div className="flex p-2 border-l-2 border-r-2 border-b-2 border-white">
              <p><strong>Last Login:</strong>&nbsp;</p>
              <p>{user?user.metadata.lastSignInTime:""}</p>
            </div>
          </div>
          <div className="flex-column justify-content-space-around w-full m-1">
            <p><strong>Stats:</strong>&nbsp;</p>
            <div className="flex p-2 border-2 border-white">
              <p><strong>Number of Organization:</strong>&nbsp;</p>
              <p>{userData?userData.orgs.length:"Number of orgs"}</p>
            </div>
            <div className="flex p-2 border-2 border-white">
              <p><strong>Messages:</strong>&nbsp;</p>
              <p>{userData?userData.msgs.length:"Message Count"}</p>
            </div>
          </div>
        </div>
        {showForm && <Button
          className="w-fit mt-4 rounded-2xl bg-blue hover:bg-blue/50 outline-non border-white border-2"
          onClick={() => {setShowPopup(true); setShowForm(false)}}

        >
          Update Profile
        </Button>
        }
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl sm:w-1/2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Edit</h2>
              <FontAwesomeIcon icon={faX}
                className="hover:text-red-500 hidden sm:block hover:cursor-pointer text-lg"
                onClick={() => {setShowPopup(false); setShowForm(true)}}
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col ">
              <label className="mb-1 hidden sm:block">New First name:</label>
              <input className="border rounded-md p-2 mb-4 text-black" type="text" id="name" name="name" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} placeholder="New First Name"></input>
              <label className="mb-1 hidden sm:block">New Last name:</label>
              <input className="border rounded-md p-2 mb-4 text-black" type="text" id="name" name="name" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} placeholder="New Last Name"></input>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" type="submit" style={{ backgroundColor: "#3b82f6" }} onClick={() => handleSubmit}>Save</button>
            </form>
            <button className="w-full bg-slate-500 text-white font-bold py-2 px-4 rounded hover:bg-slate-700 sm:hidden mt-2" type="submit"  onClick={() => {setShowPopup(false); setShowForm(true)}}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
