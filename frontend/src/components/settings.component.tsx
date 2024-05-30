import React, { useState, useEffect } from "react";

type SettingsProps = {
  font: number  
  fontSet: Function
}

export default function Settings(props: SettingsProps) {
  // Apply font size change to root element when fontSize changes
  useEffect(() => {
    localStorage.setItem("fontRatio", (props.font).toString());
    document.documentElement.style.fontSize = `${localStorage.getItem("fontRatio")}px`;
  }, [props.font]);

  return (
    <div className="rounded-2xl w-11/12 sm:w-5/6 m-auto mt-10 border p-8">
      <div className="text-4xl font-bold">Settings</div>
      <h2 className="text-4 font-bold">Feedback:</h2>
      <ul className="border-t">
        <li className="grid grid-cols-12 mt-1">
          <p className="col-span-8">Email: bbsupport@gmail.com</p>
          <a target="_blank" href="mailto:bbsupport@gmail.com" className="col-span-4 border border-r-stone-50 rounded text-center hover:bg-slate-100 hover:text-black">Send email</a>        
        </li>

        <li className="grid grid-cols-12 mt-1">
          <p className="col-span-8">Email: bbbugs@gmail.com</p>
          <a target="_blank" href="mailto:bbbugs@gmail.com" className="col-span-4 border border-r-stone-50 rounded text-center hover:bg-slate-100 hover:text-black">Report security issue</a>        
        </li>
      </ul>
    </div>
  );
}
