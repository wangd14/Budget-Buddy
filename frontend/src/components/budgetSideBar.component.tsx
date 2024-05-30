import { faArrowLeftLong, faBars, faBullseye, faChartLine, faEnvelope, faQrcode, faX, faMoneyCheckDollar, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

type BudgetSideBarProps = {
  overview: Function;
  goals: Function;
  transactions: Function;
  transactionHistory: Function;
};

export default function BudgetSideBar(props: BudgetSideBarProps) {
  const router = useRouter();
  const showElementActive = (id: string, overview: boolean, goals: boolean, transactions: boolean, transactionHistory: boolean) => {
    console.log(id)
    let element = document.getElementById(id)
    if (!element) return
    let buttons = document.getElementsByClassName("button")
    for(let i=0; i<buttons.length; i++){
      buttons[i].classList.remove("font-semibold")
    }
    element.classList.add("font-semibold")
    props?.overview(overview);
    props?.goals(goals);
    props?.transactions(transactions);
    props?.transactionHistory(transactionHistory);
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
            <div onClick={(event: React.MouseEvent<HTMLElement>) => {showElementActive("overview",true,false,false,false)}} className="flex items-center justify-start hover:text-sky-600 cursor-pointer">
              <FontAwesomeIcon icon={faChartLine} className="mr-2 text-2xl"/>
              <button id="overview" className="button text-left text-xl mr-4 my-4 hover:text-sky-600"
                >Overview
              </button>
            </div>
            <div onClick={(event: React.MouseEvent<HTMLElement>) => {showElementActive("goals",false,true,false,false)}} className="flex items-center justify-start hover:text-sky-600 cursor-pointer">
              <FontAwesomeIcon icon={faBullseye} className="mr-2 text-2xl"/>
              <button id="goals" className="button text-left text-xl mr-4 my-4"
                >Goals
              </button>
            </div>
            <div onClick={(event: React.MouseEvent<HTMLElement>) => {showElementActive("transactions",false,false,true,false)}}
            className="flex items-center justify-start hover:text-sky-500 cursor-pointer">
              <FontAwesomeIcon icon={faMoneyCheckDollar} className="mr-2 text-2xl"/>
              <button id="transactions"  className="button text-left text-xl mr-4 my-4"
                >Log Transactions
              </button>
            </div>
            <div onClick={(event: React.MouseEvent<HTMLElement>) => {showElementActive("transactionHistory",false,false,false,true)}}
            className="flex items-center justify-start hover:text-sky-500 cursor-pointer">
              <FontAwesomeIcon icon={faFile} className="mr-2 text-2xl"/>
              <button id="transactionHistory"  className="button text-left text-xl mr-4 my-4"
                >Transaction History
              </button>
            </div>
            <div onClick={()=>router.push('/welcome')} className="text-white font-semibold flex justify-center items-center border-2 bg-gray-500 rounded-md hover:bg-gray-700 mt-4 text-lg cursor-pointer outline-none py-1">
              <FontAwesomeIcon icon={faArrowLeftLong} className="mr-4" />
              <p>Go Back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
