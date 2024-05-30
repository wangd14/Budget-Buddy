"use client";
import { useState, useEffect } from "react";
import { isElement } from "react-dom/test-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";

type Props = {
  name: string;
  price: number;
};

export default function Item({ name, price }: Props) {
  const [value, setValue] = useState<Number>(0);
  const [isNegative, setIsNegative] = useState<Boolean>(false);
  const [priority, setPriority] = useState<string | null>(null);

  useEffect(() => {
    setValue(Math.abs(price));
    setIsNegative(price < 0);
    setPriority(null);
  }, [price]);

  return (
    <div className="mb-4 text-off-white">
      <div className="text-lg flex justify-between w-full font-medium">
        <div className="flex items-center">
          <div className="flex">
            <p>{name}&nbsp;</p>
            <p className="text-sm self-center">
              {priority ? ` - ${priority}` : "?"}
            </p>
          </div>
          {/* <p className="mr-4 text-sm text-cent min-w-max er hover:cursor-pointer hover:italic">Edit?</p> */}
          {/* <p className="text-sm text-center hover:cursor-pointer hover:italic">Verify?</p> */}
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={`mr-4 text-green-600 ${priority ? "" : "hidden"}`}
          />
          <p className={`text-${isNegative ? "red-600" : "green-600"}`}>
            {isNegative ? "-$" : "+$"}
            {value.toString()}
          </p>
        </div>
      </div>

      <div
        className={`flex justify-between w-4/5 mx-auto ${
          priority ? "hidden" : ""
        }`}
      >
        <p
          onClick={() => setPriority("Want")}
          className="text-sm hover:cursor-pointer hover:italic"
        >
          Want?
        </p>
        <div className="flex justify-around">
          <hr className="w-[4em] my-auto mr-4" />
          <p className="text-xs text-white my-auto">or</p>
          <hr className="w-[4em] my-auto ml-4" />
        </div>
        <p
          onClick={() => setPriority("Need")}
          className="text-sm text-white hover:cursor-pointer hover:italic"
        >
          Need?
        </p>
      </div>
    </div>
  );
}
