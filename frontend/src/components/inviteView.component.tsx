import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/AuthContext";


export default function InviteViewer({ oid }: { oid: Number }){
  const [showPopup, setShowPopup] = useState(false);
  const [recipient, setRecipient] = useState<string>("")
  const {user}: any = useAuthContext()

  const members = [1, 2];

  const actMembers = {
    1: { id: 1, name: "Josh", role:"Owner"},
    2: { id: 2, name: "Sean", role: "Member"},
    3: { id: 3, name: "David", role: "Member"}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("We got a submission");
    console.log(e)
    try {
      const response: Response = await fetch('http://localhost:3000/org/'+oid+'/invite/'+recipient,{
        method: 'POST',
        body: JSON.stringify({
          uid: user.uid
        })
      })
    } catch (error){
      console.error('We were unable to send your message: ',error)
    }

    setRecipient('');
    setShowPopup(false);
  }
  return (
    <div className="rounded-2xl w-5/6 m-auto mt-10 border">
      <div className="flex justify-between">
        <div className="text-4xl font-bold m-5 pl-5">Current Members</div>{" "}
        <p  onClick={() => setShowPopup(true)} className="m-3 mt-6 mr-16">Invite</p>

      </div>
      <ul className="m-10 mt-0 border-t pt-3 pl-1">
        {members.map((number, index) => (
          <li key={index} className="grid grid-cols-3 pb-3">
            <div>
              <a href="#" className="underline">
                {actMembers[number as keyof typeof actMembers].name}
              </a>
            </div>
            <div>
                {actMembers[number as keyof typeof actMembers].role}
            </div>
            <p>Edit</p>
          </li>
        ))}
      </ul>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="outline bg-black/20 p-6 rounded-xl sm:w-1/2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Invite by Email</h2>
              <FontAwesomeIcon icon={faX}
                className="hover:text-red-500 hidden sm:block hover:cursor-pointer text-lg"
                onClick={() => {setShowPopup(false)}}
              />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input className="border rounded-md p-2 mb-4 text-black" type="text" id="name" name="name" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient"></input>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" type="submit" onClick={() => handleSubmit}>Invite</button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
}
