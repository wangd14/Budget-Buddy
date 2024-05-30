"use client";
import React from "react";
import { Dropdown } from "flowbite-react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type budget = {
  bid: Number;
  name: string;
  amnt: Number;
  total: Number;
  duration: String;
  continuous: Boolean;
};

export default function OrgOverview({ oid }: { oid: Number }) {
  const auth: any = useAuthContext();

  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [budgetName, setBudgetName] = useState("Total");
  const [budgets, setBudgets] = useState<budget[]>([]);

  const [currBudgetBid, setCurrBudgetBid] = useState<Number | null>(null);
  const [currBudgetName, setCurrBudgetName] = useState<String | null>(null);
  const [currBudgetAmnt, setCurrBudgetAmnt] = useState<Number>(0);
  const [currBudgetTotal, setCurrBudgetTotal] = useState<Number>(0);
  const [currBudgetDuration, setCurrBudgetDuration] = useState<String | null>(
    null
  );
  const [currBudgetContinuous, setCurrBudgetContinuous] =
    useState<Boolean | null>(null);

  const [currBudget, setCurrBudget] = useState<budget | null>(null);

  const [formBudgetName, setFormBudgetName] = useState("");
  const [formBudgetTotal, setFormBudgetTotal] = useState(0);
  const [formBudgetDuration, setFormBudgetDuration] = useState<string>("");
  const [formBudgetContinuous, setFormBudgetContinuous] = useState(false);

  const updateBudgetDropdown = async () => {
    const response = await fetch(
      `http://localhost:3000/org/${oid}/budget/?token=${auth.user.accessToken}`
    );
    const data = await response.json();

    const budgetNames = await Promise.all(
      data.data.map(async (budget: { bid: Number; name: String }) => {
        const orgResponse = await fetch(
          `http://localhost:3000/org/${oid}/budget/${budget.bid}?token=${auth.user.accessToken}`
        );
        const orgData = await orgResponse.json();

        return orgData.data;
      })
    );

    setBudgets(budgetNames);
  };

  const updateCurrBudget = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newCurrBudget: budget = {
      bid: -1,
      name: "",
      amnt: 0,
      total: 0,
      duration: "",
      continuous: false,
    };
    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].name == (e.target as HTMLSelectElement).value) {
        newCurrBudget = budgets[i];
        break;
      }
    }

    setCurrBudgetBid(newCurrBudget.bid);
    setCurrBudgetName(newCurrBudget.name);
    setCurrBudgetAmnt(newCurrBudget.amnt);
    setCurrBudgetTotal(newCurrBudget.total);
    setCurrBudgetDuration(newCurrBudget.duration);
    setCurrBudgetContinuous(newCurrBudget.continuous);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Inedit");
    setShowEditPopup(false);
    console.log("We got a submission");

    // console.log(auth);
    //Creates the budget
    console.log("Inside Edit budget");

    const putResponse = await fetch(
      `http://localhost:3000/org/${oid}/budget/${currBudgetBid}?token=${auth.user.accessToken}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json", //application/x-www-form-urlencoded
        },
        body: JSON.stringify({
          name: formBudgetName,
          amnt: formBudgetTotal,
          duration: formBudgetDuration,
          continuous: formBudgetContinuous,
        }),
      }
    );

    console.log(await putResponse.json());

    //Update the display for the orgs
    setShowEditPopup(false);

    setFormBudgetName("");
    setFormBudgetTotal(0);
    setFormBudgetDuration("");
    setFormBudgetContinuous(false);

    updateBudgetDropdown();

    const getResponse = await fetch(
      `http://localhost:3000/org/${oid}/budget/${currBudgetBid}?token=${auth.user.accessToken}`
    );

    const budgetData = await getResponse.json();

    setCurrBudgetName(budgetData.name);
    setCurrBudgetAmnt(budgetData.amnt);
    setCurrBudgetTotal(budgetData.total);
    setCurrBudgetDuration(budgetData.duration);
    setCurrBudgetContinuous(budgetData.continuous);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("We got a submission");

    // console.log(auth);
    //Creates the budget
    console.log("Inside budget");
    console.log(formBudgetName);
    console.log(formBudgetTotal);
    console.log(formBudgetDuration);
    console.log(formBudgetContinuous);
    console.log("ORG ID " + oid);
    const postResponse = await fetch(
      "http://localhost:3000/org/" + oid + "/budget?token=token",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json", //application/x-www-form-urlencoded
        },
        body: JSON.stringify({
          name: formBudgetName,
          total: formBudgetTotal,
          duration: formBudgetDuration,
          continuous: formBudgetContinuous,
        }),
      }
    );

    //Update the display for the orgs
    setShowPopup(false);

    setFormBudgetName("");
    setFormBudgetTotal(0);
    setFormBudgetDuration("");
    setFormBudgetContinuous(false);

    await updateBudgetDropdown();

    const newBudget = await postResponse.json();

    setCurrBudgetName(newBudget.data.name);
    setCurrBudgetAmnt(newBudget.data.amnt);
    setCurrBudgetTotal(newBudget.data.total);
    setCurrBudgetDuration(newBudget.data.duration);
    setCurrBudgetContinuous(newBudget.data.continuous);

    const select = document.getElementById("bDropdown");
    (select as HTMLSelectElement).selectedIndex =
      (select as HTMLSelectElement).length - 1;
  };

  useEffect(() => {
    const fetchOrgs = async () => {
      const response = await fetch(
        `http://localhost:3000/org/${oid}/budget/?token=${auth.user.accessToken}`
      );
      const data = await response.json();

      const budgets = await Promise.all(
        data.data.map(async (budget: { bid: Number; name: String }) => {
          const orgResponse = await fetch(
            `http://localhost:3000/org/${oid}/budget/${budget.bid}?token=${auth.user.accessToken}`
          );
          const orgData = await orgResponse.json();

          // const orgUser = await fetch(`http://localhost:3000/org/${orgId}/user/${auth.user.uid}`)
          return orgData.data;
        })
      );

      setBudgets(budgets);

      setCurrBudgetBid(budgets[0].bid);
      setCurrBudgetName(budgets[0].name);
      setCurrBudgetAmnt(budgets[0].amnt);
      setCurrBudgetTotal(budgets[0].total);
      setCurrBudgetDuration(budgets[0].duration);
      setCurrBudgetContinuous(budgets[0].continuous);
    };
    fetchOrgs();
  }, [auth.user.uid]);

  return (
    <div className="rounded-2xl w-11/12 sm:w-5/6 m-auto mt-10 border">
      <div className="flex flex-col md:flex-row justify-between mx-10 items-center">
        <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
          <div className="flex text-center sm:text-left text-4xl font-bold my-5">
            Budgets
          </div>
          <div className="flex justify-between">
            <select
              onChange={updateCurrBudget}
              className="flex rounded-lg w-2/5 sm:w-auto bg-white border-2 border-white text-slate-500 cursor-pointer "
              id="bDropdown"
            >
              {budgets.map((budget, i) => (
                <option key={i}>{budget.name}</option>
              ))}
            </select>
            <p
              onClick={() => setShowPopup(true)}
              className="block w-2/5 sm:hidden sm:w-auto text-center rounded-lg border-2 border-green-500 p-2 hover:bg-green-500 cursor-pointer "
            >
              Create Budget
            </p>
          </div>
        </div>
        <p
          onClick={() => setShowPopup(true)}
          className="hidden sm:block rounded-lg border-2 border-green-500 p-2 hover:bg-green-500 cursor-pointer "
        >
          Create Budget
        </p>
      </div>
      <div className="m-10 mt-2 border-t pt-3 flex flex-col justify-between">
        <div className="flex justify-between pb-2 pt-2">
          {currBudgetName && (
            <p className="pl-2 font-semibold">{currBudgetName} - </p>
          )}
          <p className="">
            {currBudgetAmnt ? <> ${currBudgetAmnt}</> : <> ${0}&nbsp;</>}/
            {currBudgetTotal ? <> ${currBudgetTotal}</> : <> ${0}</>}
          </p>
          {currBudgetDuration && (
            <p className="pl-2">Duration: {currBudgetDuration}</p>
          )}
        </div>
        {/* <p
          onClick={() => setShowEditPopup(true)}
          className="rounded-lg border-2 border-yellow-700 p-2 hover:bg-yellow-700 cursor-pointer m-3 w-36"
        >
          Edit Budget
        </p> */}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">New Budget</h2>
              <FontAwesomeIcon
                icon={faX}
                className="text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1"
                onClick={() => {
                  setShowPopup(false);
                  setFormBudgetName("");
                  setFormBudgetTotal(0);
                  setFormBudgetDuration("");
                  setFormBudgetContinuous(false);
                }}
              />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              <label className="mb-2">Budget name:</label>
              <input
                className="border rounded-md p-2 mb-4 text-black"
                type="text"
                id="bname"
                name="bname"
                value={formBudgetName}
                onChange={(e) => setFormBudgetName(e.target.value)}
                placeholder="Budget Name"
              ></input>
              <label className="mb-2">Total Budget:</label>
              <input
                className="border rounded-md p-2 mb-4 text-black"
                type="number"
                id="btotal"
                name="btotal"
                value={formBudgetTotal}
                onChange={(e) => setFormBudgetTotal(Number(e.target.value))}
                placeholder="Total Budget"
              ></input>
              <label className="mb-2">Go Until:</label>
              <input
                type="date"
                id="date"
                name="date"
                min={0}
                value={formBudgetDuration}
                onChange={(e) => setFormBudgetDuration(e.target.value)}
                placeholder="Due By"
                className="border rounded-md p-2 mb-4 text-black"
              ></input>
              {/* <input
                className="border rounded-md p-2 mb-4 text-black"
                type="number"
                id="bduration"
                name="bduration"
                value={formBudgetDuration}
                onChange={(e) => setFormBudgetDuration(Number(e.target.value))}
                placeholder="Total Budget"
              ></input> */}
              <div className="flex gap-2 items-center mb-2">
                <label className="flex m-0 items-center align-middle">
                  Continuous
                </label>
                <input
                  className="border rounded-md p-2 text-black "
                  type="checkbox"
                  id="bcontinuous"
                  name="bcontinuous"
                  onChange={(e) =>
                    setFormBudgetContinuous(!formBudgetContinuous)
                  }
                  placeholder="Total Budget"
                ></input>
              </div>

              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                type="submit"
                style={{ backgroundColor: "#3b82f6" }}
                onClick={() => {
                  handleSubmit;
                }}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">Edit Budget</h2>
              <button
                onClick={() => {
                  setShowEditPopup(false);
                  setFormBudgetName("");
                  setFormBudgetTotal(0);
                  setFormBudgetDuration("");
                  setFormBudgetContinuous(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="flex flex-col ">
              <label className="mb-2">Budget name:</label>
              <input
                className="border rounded-md p-2 mb-4 text-black"
                type="text"
                id="bename"
                name="bename"
                value={formBudgetName}
                onChange={(e) => setFormBudgetName(e.target.value)}
                placeholder="Organization Name"
              ></input>
              <label className="mb-2">Total Budget:</label>
              <input
                className="border rounded-md p-2 mb-4 text-black"
                type="number"
                id="betotal"
                name="betotal"
                value={formBudgetTotal}
                onChange={(e) => setFormBudgetTotal(Number(e.target.value))}
                placeholder="Total Budget"
              ></input>
              <label className="mb-2">Go Until:</label>
              <input
                type="date"
                id="date"
                name="date"
                min={0}
                value={formBudgetDuration}
                onChange={(e) => setFormBudgetDuration(e.target.value)}
                placeholder="Due By"
                className="border rounded-md p-2 mb-4 text-black"
              ></input>
              <div className="flex gap-2 items-center mb-2">
                <label className="flex m-0 items-center align-middle">
                  Continuous
                </label>
                <input
                  className="border rounded-md p-2 text-black "
                  type="checkbox"
                  id="becontinuous"
                  name="becontinuous"
                  onChange={(e) =>
                    setFormBudgetContinuous(!formBudgetContinuous)
                  }
                  placeholder="Total Budget"
                ></input>
              </div>

              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                type="submit"
                style={{ backgroundColor: "#3b82f6" }}
                onClick={() => {
                  handleEditSubmit;
                }}
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
