import React from "react"
import Image from "next/image"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { faUsers } from "@fortawesome/free-solid-svg-icons"

type SideBarProps = {
  budget: Function  
  invite: Function
  settings: Function
}

export default function SideBar(props?: SideBarProps) {

  const [active,setActive] = useState<string>("overview")
  const showElementActive = (id: string, budget: boolean, invite: boolean, settings: boolean) => {
    console.log(id)
    let element = document.getElementById(id)
    if (!element) return
    let buttons = document.getElementsByClassName("button")
    for(let i=0; i<buttons.length; i++){
      buttons[i].classList.remove("font-semibold")
    }
    element.classList.add("font-semibold")
    props?.budget(budget);
    props?.invite(invite);
    props?.settings(settings);
    toggleSlideOver()
  }
  
  const toggleSlideOver = () => {
    document.getElementById('slideover-container')?.classList.toggle('invisible');
    document.getElementById('slideover-bg')?.classList.toggle('opacity-0');
    document.getElementById('slideover-bg')?.classList.toggle('opacity-50');
    document.getElementById('slideover')?.classList.toggle('translate-x-full');
  }

  return (
    <div className="float-right top-0 right-0">
      <FontAwesomeIcon icon={faBars} onClick={toggleSlideOver} className="cursor-pointer ml-auto mr-4 my-4 text-3xl hover:text-ocean hover:bg-white p-2 rounded-lg" />
      <div id="slideover-container" className="w-full h-full fixed inset-0 invisible">
        <div  id="slideover-bg" className="w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 opacity-0"></div>
        <div  id="slideover" className="bg-white h-full absolute right-0 duration-300 ease-out transition-all translate-x-full p-4">
          <div className="flex justify-between items-center text-black mb-4">
            <p className="text-4xl font-extrabold mr-4 text-sky-500">BB</p>
            <FontAwesomeIcon onClick={toggleSlideOver} icon={faX} className="text-2xl ml-auto cursor-pointer hover:border-black border-2 border-transparent rounded p-1"/>
          </div>
          <div className="text-black h-full w-full flex flex-col items-between pr-2">
            <div className="flex items-center justify-start hover:text-sky-600">
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-2xl"/>
              <button id="budgets" className="button text-left text-xl mr-4 my-4 hover:text-sky-600"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {showElementActive(event.currentTarget.id,true,false,false)}}>Organizations
              </button>
            </div>
            {/* <div className="flex items-center justify-start hover:text-sky-500">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2 text-2xl"/>
              <button id="invitations" className="button text-left text-xl mr-4 my-4"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {showElementActive(event.currentTarget.id,false,true,false)}}>Invitations
              </button>
            </div> */}
            <div className="flex items-center justify-start hover:text-sky-500">
              <FontAwesomeIcon icon={faCog} className="mr-2 text-2xl"/>
              <button id="settings"  className="button text-left text-xl mr-4 my-4"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {showElementActive(event.currentTarget.id,false,false,true)}}>Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
