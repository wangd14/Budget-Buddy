'use client'
import Navbar from "@/components/navbar.component"
import SideBar from "@/components/sideBar.component"
import OrgViewer from "@/components/orgViewer.component"
import Settings from "@/components/settings.component"
import selectImage from "@/images/undraw_small_town_re_7mcn.svg"

import Image from "next/image"

import { useEffect, useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

type Props = {
  goalName: string
  totalCompleted: number
  goalNum: number
}


export default function Page() {

  //user must be logged in to view this page
  const {user}: any = useAuthContext()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.push("/")
    console.log(user)
  }, [router,user])

  const [viewBudget, setViewBudget] = useState(false);
  const [viewInvitations, setInvitationsBudget] = useState(false);
  const [viewSettings, setSettings] = useState(false);
  const [fontRatio, setFontRatio] = useState(() => {
    const storedFont = localStorage.getItem("fontSize");
    return storedFont ? parseInt(storedFont, 10) : 16;
  });

  

  return (
    <>
      <Navbar showProfile />
      
      <div className="w-full">
        <SideBar budget={setViewBudget} invite={setInvitationsBudget} settings={setSettings} ></SideBar> 
        <div className="flex flex-wrap justify-evenly w-11/12 sm:w-5/6 h-[calc(100vh-56px)] mx-auto">
          {!viewBudget && !viewInvitations && !viewSettings && (
            <div className="flex flex-col items-center justify-center">
              <Image
                src={selectImage.src}
                height={500}
                width={500}
                alt="Waiting Image"
              />
              <div>Nothing selected</div>
            </div>
          )}
          {viewBudget && <OrgViewer />}
          {viewSettings && <Settings font={fontRatio} fontSet={setFontRatio}/>}
        </div>

      </div>
    </>
  );
}
