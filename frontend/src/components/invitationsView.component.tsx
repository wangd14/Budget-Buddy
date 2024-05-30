import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

const deleteButton = {
  base: "group relative flex justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none w-[100px]",
  color: {
    delete:
      "border text-white bg-[#465b66] border-[#889397] enabled:hover:bg-[#5C6C75] enabled:hover:border-[#889397] enabled:hover:shadow-[#648291_0px_0px_0px_3px]",
  },
  inner: {
    base: "flex items-stretch transition-all duration-200",
    position: {
      none: "",
      start: "rounded-r-none",
      middle: "rounded-none",
      end: "rounded-l-none",
    },
    outline: "border border-transparent",
    isProcessingPadding: {
      xs: "pl-8",
      sm: "pl-10",
      md: "pl-12",
      lg: "pl-16",
      xl: "pl-20",
    },
  },
  label:
    "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
  outline: {
    color: {
      gray: "border border-gray-900 dark:border-white",
      default: "border-0",
      light: "",
    },
    off: "",
    on: "flex w-full justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white",
    pill: {
      off: "rounded-md",
      on: "rounded-full",
    },
  },
  pill: {
    off: "rounded-lg",
    on: "rounded-full",
  },
  size: {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-base",
  },
};

const createButton = {
  base: "group relative flex justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none w-[160px] inline-flex	items-center h-10",
  color: {
    create:
      "border text-white bg-[#048c54] border-[#0ce07f] enabled:hover:bg-[#045c3c] enabled:hover:border-[#0ce07f] enabled:hover:shadow-[#03452d_0px_0px_0px_3px]",
  },
};

type message = {
  title: string,
  text: string,
  time: number,
  link: string
}

export default function InvitationsView() {
  const [messages,setMessages] = useState<message[]>([])

  const auth: any = useAuthContext();
  const router = useRouter();
  const orgs = [4, 5, 6];

  const actOrgs = {
    4: { id: 4, name: "Gamma Nu Eta" },
    5: { id: 5, name: "Society of Hispanic Professional Engineers" },
    6: { id: 6, name: "National Society of Black Engineers" },
  };

  useEffect(() => {
    const fetchMsgs = async () => {
      const response = await fetch(
        'http://localhost:3000/user/'+auth.user.uid
      );
      const data = await response.json();
      const inviteMsgs = await Promise.all(
        data.data.msgs.map(async (msg: message) => {
          const returnData = {
            title: msg.title,
            text: msg.text,
            time: msg.time,
            link: msg.link
          };
          return returnData;
        })
      );
      setMessages(inviteMsgs);
      console.log(messages);
    };
    fetchMsgs();
  }, [messages]);

  
  
  return (
    <div className="rounded-2xl w-5/6 m-auto mt-10 border">
      <p className="text-4xl font-bold m-5 pl-5 flex items-center">Invitations</p>
      <ul className="m-10 mt-0 border-t pt-3 pl-1">
        {orgs.map((number, index) => (
          <li key={index} className="grid grid-cols-12 my-2">
            <div className="col-span-8">{actOrgs[number as keyof typeof actOrgs].name}</div>
            <button className="col-span-2 rounded-lg border-green-500 border-2 w-fit px-4 py-1 ml-auto hover:border-white hover:bg-green-500 hover:shadow hover:shadow-white">Accept</button>
            <button className="col-span-2 rounded-lg border-red-500 border-2 w-fit px-4 py-1 ml-auto hover:border-white hover:bg-red-500 hover:shadow hover:shadow-white text-end">Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
