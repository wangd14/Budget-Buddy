import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

type goal = {
  gid: number,
  name: string,
  amnt: number,
  total: number,
  dateDue: number,
  exits: boolean,
}

type showGoalEditPopup = {
  isActive: boolean;
  goalID: Number;
};

export default function GoalsViewer({oid}: {oid: Number}) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editGoal,setEditGoal] = useState<boolean>(false);
  const [editGoalID, setEditGoalID] = useState<Number>(0);
  const [goalName, setGoalName] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [goalCompleteDate,setGoalCompleteDate] = useState<string>("")
  const [goals,setGoals] = useState<goal[] | null>(null)

  const [showGoalEditPopup, setGoalEditPopup] =
    useState<showGoalEditPopup>({
      isActive: false,
      goalID: 0,
    });

    const handleEditingGoal = (newValue: Number) => {
      // Adjust `newValue` type if needed
      console.log("Editing goal id: " + newValue);
      setGoalEditPopup((prevState) => ({
        ...prevState,
        isActive: !prevState.isActive,
        goalID: newValue,
      }));
    };
    const handleToggleEditingGoal = () => {
      setGoalEditPopup({
        isActive: !showGoalEditPopup.isActive,
        goalID: 0, // Update value here if needed
      });
    };

  const createGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    await fetch('/org/'+oid+'/goal?token=token',{
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        name: goalName,
        total: goalAmount,
        dateDue: goalCompleteDate
      })
    })
    setGoalName('')
    setGoalAmount(0)
    setGoalCompleteDate('')
    setShowPopup(false);

  }
  const submitEditGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("We're EDITING GOAL ");
    console.log(editGoalID);
    console.log(goalName);
    console.log(goalAmount);
    console.log(goalCompleteDate);

    console.log('hi')
    const response: Response = await fetch('/org/'+oid+'/goal/'+editGoalID+ '?token=token',{
      method: "PUT",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        name: goalName,
        total: goalAmount,
        dateDue: goalCompleteDate,
        bid:editGoalID
      })
    })
    console.log('hey')
    console.log(oid); 
    //const data = await response.json()
    //console.log(data)
    setGoalName('')
    setGoalAmount(0)
    setGoalCompleteDate('')
    handleToggleEditingGoal();
    // setShowPopup(false);
  }

  const renderGoals = async () => {
    const response: Response = await fetch('/org/'+oid+'/goal?token=token');
    const data = await response.json();
    console.log(data)
    setGoals(data.data)
  }

  useEffect(() => {
    renderGoals()
  },[])



  return (
    <div className="rounded-2xl w-11/12 sm:w-5/6 m-auto mt-10 p-10 border">
      <div className="flex justify-between items-center">
        <div className="text-4xl font-bold">Goals</div>
        <div onClick={() => setShowPopup(true)} className="flex justify-between items-center rounded-md border-2 border-green-500 hover:bg-green-500 cursor-pointer px-2 py-1">
          <FontAwesomeIcon icon={faPlus} className="text-2xl mr-4"/>
          <p className="font-semibold"> Create Goal</p>
        </div>
      </div>
      <ul className="border-t pt-3">
        {goals && goals.map((goal, index) => (
          <li key={index} className="grid grid-cols-3 pb-3">
            <p className="font-semibold">{goal.name}</p>
            <p>${goal.amnt} / ${goal.total}</p>
            <div onClick={()=>{setEditGoalID(goal.gid);handleEditingGoal(goal.gid)}} className="flex justify-center rounded-md border-2 border-yellow-500 hover:bg-yellow-500 cursor-pointer p-1">
              <FontAwesomeIcon icon={faPenToSquare} className="text-2xl mr-4"/>
              <p className="font-semibold">Edit</p>
            </div>
          </li>
        ))}
      </ul>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">Create Goal</h2>
              <FontAwesomeIcon icon={faX} onClick={()=>setShowPopup(false)} className="text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1"/>
            </div>
            <form onSubmit={createGoal} className="flex flex-col ">
              <label htmlFor="bname" className="mb-2">Goal Name:</label>
              <input
                type="text"
                id="bname"
                name="bname"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Goal Name"
                required
                className="border rounded-md p-2 mb-4 text-black"
              ></input>
              <label htmlFor="amount" className="mb-2">Total Budget:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                min={0}
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                placeholder="Total Budget"
                className="border rounded-md p-2 mb-4 text-black"
                required
              ></input>
              <label htmlFor="date" className="mb-2">Due by:</label>
              <input
                type="date"
                id="date"
                name="date"
                min={0}
                value={goalCompleteDate}
                onChange={(e) => setGoalCompleteDate(e.target.value)}
                placeholder="Due By"
                className="border rounded-md p-2 mb-4 text-black"
              ></input>

              <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">Create</button>
            </form>
          </div>
        </div>
      )}
       {showGoalEditPopup.isActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">Edit Goal</h2>
              <FontAwesomeIcon icon={faX} onClick={handleToggleEditingGoal} className="text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1"/>
            </div>
            <form onSubmit={submitEditGoal} className="flex flex-col ">
              <label className="mb-2">Goal Name:</label>
              <input
                className="border rounded-md p-2 mb-4 text-black"
                type="text"
                id="bname"
                name="bname"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Goal Name"
              ></input>
              <label className="mb-2">Total Budget:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                min={0}
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                placeholder="Total Budget"
                className="border rounded-md p-2 mb-4 text-black"
              ></input>
              <label className="mb-2">Due by:</label>
              <input
                type="date"
                id="date"
                name="date"
                min={0}
                value={goalCompleteDate}
                onChange={(e) => setGoalCompleteDate(e.target.value)}
                placeholder="Due By"
                className="border rounded-md p-2 mb-4 text-black"
              ></input>
              <button type="submit" className="bg-yellow-400 text-white font-bold py-2 px-4 rounded hover:bg-yellow-500">Update</button>
            </form>
          </div>
        </div>)}
    </div>
  );
}
