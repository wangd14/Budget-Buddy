'use client'
import React, { useEffect } from "react";
import Navbar from "@/components/navbar.component";
import UserInfo from "@/components/userInfo.component";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function Page() {
  //user must be logged in to view this page
  const user = useAuthContext()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.push("/")
  }, [router,user])

  return (
    <div className="h-full ">
      <Navbar showProfile isProfilePage/>
      <UserInfo/>
    </div>
  );
}
