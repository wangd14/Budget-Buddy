import React, { useState } from "react";
import { Button } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import receipt from "@/images/receipt-example.webp";
import Item from "@/components/item.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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

export default function ScannerViewer() {
  return (
    <main className="max-w-screen-lg mx-auto">
      <div className="flex">
        <div id="scan" className="flex flex-col flex-[50%] p-4">
          <p className="text-3xl font-bold mt-4">Upload File:</p>
          <hr className="mb-2" />
          <div className="flex justify-center mb-2">
            <p>File uploaded:&nbsp;</p>
            <p className="italic text-center ">receipt.png</p>
          </div>
          <div className="mx-auto items-center justify-center h-auto max-h-[60vh]">
            <div className="h-full w-full rounded-md bg-white  p-1">
              <div className="flex h-full w-full items-center justify-center bg-top">
                <Image
                  src={receipt}
                  alt="receipt-example"
                  className="h-full w-full object-cover bg-top rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="found" className="flex-[50%] p-4">
          <div className="flex justify-between items-center mt-4">
            <p className="text-3xl font-bold">We Found: </p>
            <p className="text-lg font-bold mt-auto hover:bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:text-transparent hover:bg-clip-text hover:cursor-pointer">
              Verify All{" "}
            </p>
          </div>
          <hr className="mb-2" />
          <Item name="Vinyl Gloves" price={-11.72} />
          <Item name="Ajax Dishlim" price={-2.96} />
          <Item name="Advil Dual18" price={-3.98} />
          <Item name="MCC/SCH Pars" price={-2.44} />
          <Item name="Vinyl Gloves" price={-11.72} />
        </div>
      </div>
      <div className="flex justify-center text-3xl">
        <button className="p-2 bg-white text-black rounded-2xl w-fit mx-auto my-4 hover:bg-gradient-to-br from-red-700 via-purple-700 to-blue-700 hover:text-white">
          <FontAwesomeIcon icon={faCamera} className="mx-1" />
        </button>
      </div>
      <form className="text-white">
        <label>Upload image:</label>
        <input type="file" id="img" name="img" accept="image/*"></input>
        <input type="submit"></input>
      </form>
    </main>
  );
}
