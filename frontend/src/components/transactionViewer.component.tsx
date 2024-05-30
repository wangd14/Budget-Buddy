"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function TransactionViewer({ oid }: { oid: Number }) {
  const [total, setTotal] = useState<number>(0); //the receipts total
  const [entries, setEntries] = useState<
    Array<{ bid: number; name: string; price: number; quantity: number }>
  >([{ bid: -1, name: "Name", price: 0, quantity: 1 }]);
  const [budgets, setBudgets] = useState<Array<{ bid: number; name: string }>>(
    []
  );
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([]);

  useEffect(() => {
    calculateTotal();
  }, [entries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/org/" + oid + "/budget?token=atoken"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setBudgets(jsonData.data);
        setOptions(
          budgets.map((budget) => ({ value: budget.bid, label: budget.name }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [budgets]);

  const calculateTotal = () => {
    let runningTotal = 0;
    entries.forEach((entry) => {
      runningTotal += entry.price * entry.quantity;
    });
    setTotal(runningTotal);
  };

  function addEntry() {
    setEntries([...entries, { bid: -1, name: "", price: 0, quantity: 1 }]);
  }

  const handleInputChange = (
    index: number,
    field: string,
    value: string | Number
  ) => {
    const newEntries = [...entries];
    if (field == "bid") {
      let val = -1;
      for (let i = 0; i < budgets.length; i++) {
        if (budgets[i].name == value) {
          val = budgets[i].bid;
        }
      }
      newEntries[index] = {
        ...newEntries[index],
        [field]: val,
      };
    } else {
      newEntries[index] = {
        ...newEntries[index],
        [field]: value,
      };
    }
    calculateTotal();
    setEntries(newEntries);
  };

  function removeEntry(index: number) {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  }

  async function submitTransactions() {
    console.log("entries size: " + entries.length);

    for (let i = 0; i < entries.length; i++) {
      try {
        await fetch(
          "http://localhost:3000/org/" + oid + "/transaction?token=atoken",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              item: entries[i].name,
              qty: entries[i].quantity,
              unitprice: entries[i].price,
              bid: entries[i].bid,
            }),
          }
        );

        // const c = await fetch(
        //   "http://localhost:3000/org/" + oid + "?token=atoken"
        // );
        // console.log();
      } catch (error) {
        console.log(error);
      }
    }
    setEntries([{ bid: -1, name: "", price: 0, quantity: 1 }]);
  }

  return (
    <div className="flex flex-col m-auto mt-10 rounded-2xl w-11/12 sm:w-5/6 border p-5">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Transaction List</p>
        <p className="text-2xl">
          Total: $<strong>{isNaN(total) ? 0 : total}</strong>
        </p>
      </div>
      <hr />
      <table id="entryCollection" className="my-3 border-collapse">
        <tr className="italic sm:border-l">
          <th className="text-start border p-1">Select</th>
          <th className="text-start border p-1">Item</th>
          <th className="text-start border p-1">Unit Price</th>
          <th className="text-start border p-1">Quantity</th>
          <th className="text-start border p-1">Delete</th>
        </tr>
        {entries.map((entry, index) => (
          <tr key={index} className="gap-1 items-center ">
            {/* Select budget entry */}
            <td className="border p-1">
              <select
                onChange={(newValue) =>
                  newValue
                    ? // ? console.log(newValue)
                      handleInputChange(
                        index,
                        "bid",
                        (newValue.target as HTMLSelectElement).value
                      )
                    : console.log("Couldn't assign bid")
                }
                className="border-none text-black"
              >
                {options.map((option, i) => {
                  if (i != 0) {
                    return <option key={i}>{option.label}</option>;
                  } else {
                    return (
                      <option disabled selected key={i}>
                        select an option
                      </option>
                    );
                  }
                })}
              </select>
            </td>

            {/* Name of item entry */}
            <td className="border p-1">
              <input
                type="text"
                value={entry.name}
                placeholder="Name of item"
                className="text-white bg-transparent w-full border-2 border-transparent focus:border-white focus:border-2 focus:ring-0 focus:outline-none"
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              />
            </td>

            {/* Unit Price Entry */}
            <td className="border p-1">
              <input
                type="number"
                value={entry.price}
                min={0}
                placeholder="Unit price"
                className="bg-transparent w-full border-2 border-transparent focus:border-white focus:border-2 focus:ring-0 focus:outline-none"
                onChange={(e) =>
                  handleInputChange(index, "price", parseFloat(e.target.value))
                }
              />
            </td>

            {/* Quantity Entry */}
            <td className="border p-1">
              <input
                type="number"
                value={entry.quantity}
                min={1}
                placeholder="Quantity"
                className="bg-transparent w-full border-2 border-transparent focus:border-white focus:border-2 focus:ring-0 focus:outline-none"
                onChange={(e) =>
                  handleInputChange(index, "quantity", parseInt(e.target.value))
                }
              />
            </td>

            {/* Delete this row */}
            <td className="border p-1 text-center">
              <FontAwesomeIcon
                onClick={() => removeEntry(index)}
                icon={faTrash}
                className="text-2xl hover:text-red-600 cursor-pointer text-white text-center mx-auto p-auto"
              />
            </td>
          </tr>
        ))}
      </table>

      {/* Plus button */}
      <div
        onClick={() => addEntry()}
        className="flex justify-center items-center w-full border-green-600 border-2 hover:bg-green-600 rounded-lg text-center cursor-pointer font-semibold py-1 my-3"
      >
        <FontAwesomeIcon icon={faPlus} className=" rounded-lg mr-2" />
        <p>Add Item</p>
      </div>

      {/* Submit button */}
      <p
        onClick={() => submitTransactions()}
        className="w-full border-blue-500 border-2 hover:bg-blue-500 rounded-lg text-center cursor-pointer font-semibold py-1 my-3"
      >
        Submit Transactions
      </p>
    </div>
  );
}
