'use client'
import { useState, useEffect } from "react"
import GoalProgress from "@/components/goalProgress.component"

type Props = {
  goalName: string,
  totalCompleted: number,
  goalNum: number
}

export default function Stats(props: { goals: Props[] }){
  return (
    <div>
      <p className="text-5xl">Your Statistics: </p>
      <br />
      {props.goals.map((goal, index) => (
        <GoalProgress key={index}{...goal}></GoalProgress>
      ))}
    </div>
  )
}