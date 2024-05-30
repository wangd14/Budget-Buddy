'use client'

type Props = {
    goalName: string,
    totalCompleted: number,
    goalNum: number
  }

export default function GoalProgress({goalName, totalCompleted, goalNum}: Props){
  return (
    <div className=" bg-black text-off-white rounded-2xl p-5 my-5">
        <div className="flex justify-between text-lg">
            <p className="text-off-white">{goalName}&nbsp;</p>
            <p className="text-yellow-400">${totalCompleted} / ${goalNum}</p>
        </div>
        <p className="italic">{Math.floor(totalCompleted / goalNum * 100)}% Complete</p>
    </div>
    
  )
}