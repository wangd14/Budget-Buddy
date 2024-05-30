'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Select from 'react-select'

interface Transaction {
  bid: number;
  item: string;
  unitprice: number;
  qty: number;
  exists: boolean;
  _id: string;
}

export default function TransactionHistoryViewer({ oid }: { oid: Number }){
  const [orgName, setOrgName] = useState(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/org/' + oid + '?token=atoken');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setOrgName(jsonData.data.orgname);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [oid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/org/' + oid + '/transaction?token=atoken');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setTransactions(jsonData.data);
        setFilteredTransactions(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [oid]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.toLowerCase();
    setQuery(newQuery);

    let filtered = transactions.filter(entry =>
      entry.item.toLowerCase().includes(newQuery) ||
      entry.unitprice.toString().toLowerCase().includes(newQuery) ||
      entry.qty.toString().toLowerCase().includes(newQuery)
    );

    if (filtered.length == 0) filtered = transactions;

    setFilteredTransactions(filtered);
  };

  return (
    <div className="flex flex-col m-auto mt-10 rounded-2xl w-5/6 border p-5">
      <div className="flex justify-between">
        <p className="text-2xl sm:text-4xl font-bold">Transaction History {orgName && (" - ") + orgName} </p>
      </div>
      <hr />  

      <div className="flex items-center my-4">
        <h1>Search Transactions: </h1>
        <input
        type="text"
        className="bg-white text-black w-full border rounded-2xl"
        value={query}
        onChange={handleQueryChange}
        />
      </div>
      
      {/* flex flex-col sm:flex-row justify-start sm:justify-between items-start */}
      <hr />
      {filteredTransactions.map((entry, index) => (
        <>
          <div key={index} className=" p-5 grid grid-cols-4 gap-4">
            <h1 className="font-bold">{entry.item}</h1>
            <p>Unit Price: ${entry.unitprice}</p>
            <p>Quantity Bought: {entry.qty}</p>
            <p className="text-red-500">Total: ${entry.unitprice * entry.qty}</p>
          </div>
          <hr />
        </>
        
      ))}
      

    </div>
  )
}


