'use client'
import { useState, useEffect } from "react"
import { isElement } from "react-dom/test-utils"

type Props = {
  goal: string,
  current: number,
  price: number,
  dueDate: string
}

export default function Item({goal, current ,price,dueDate}: Props){
  const [value,setValue] = useState<Number>(0)
  const [isNegative,setIsNegative] = useState<Boolean>(false)

  useEffect(() => {
    setValue(Math.abs(price))
    setIsNegative(price < 0)
  },[price])

  return (
    <div className="text-white">
      <div className="flex justify-between w-full font-medium">
        <p>{goal}</p>
        <p>{dueDate}</p>
        <p>${current.toString()}/${value.toString()}</p>
      </div>

      <div className="flex justify-between w-4/5 mx-auto">
        <p className="text-sm hover:cursor-pointer hover:italic">Add funds</p>
        <p className="text-sm hover:cursor-pointer hover:italic">Edit?</p>
      </div>
    </div>
  )
}