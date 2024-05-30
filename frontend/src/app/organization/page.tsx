"use client";
import React from "react";
import Navbar from "@/components/navbar.component";
import BudgetSideBar from "@/components/budgetSideBar.component";
import GoalsViewer from "@/components/goalsViews.component";
import { useState, useEffect } from "react";
import OrgOverview from "@/components/overview.component";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import TransactionViewer from "@/components/transactionViewer.component";
import TransactionHistoryViewer from "@/components/transactionHistoryView";

export default function Page() {
  //user must be logged in to view this page
  const { user }: any = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/");
  }, [router, user]);

  const [viewOverview, setViewOverview] = useState(true);
  const [viewGoals, setViewGoals] = useState(false);
  const [viewTransactions, setViewTransactions] = useState(false);
  const [viewTransactionHist, setViewTransactionHist] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${localStorage.getItem(
      "fontRatio"
    )}px`;
  }, []);
  return (
    <>
      <Navbar showProfile />
      <div className="w-full">
        <BudgetSideBar
          overview={setViewOverview}
          goals={setViewGoals}
          transactions={setViewTransactions}
          transactionHistory={setViewTransactionHist}
        />
        <div className="flex flex-wrap justify-evenly w-full h-screen">
          {viewOverview && (<OrgOverview oid={Number(window.location.pathname.split("/")[2])}></OrgOverview>)}
          {viewGoals && <GoalsViewer oid={Number(window.location.pathname.split("/")[2])}></GoalsViewer>}
          {viewTransactions && <TransactionViewer oid={Number(window.location.pathname.split("/")[2])}></TransactionViewer>}
          {viewTransactionHist && <TransactionHistoryViewer oid={Number(window.location.pathname.split("/")[2])}></TransactionHistoryViewer>}
        </div>
      </div>
    </>
  );
}
