import React from "react";

export default function UserOrgHandling() {
	return (
		<div className="text-black bg-white border border-black rounded-3xl my-1 w-2/5 mx-auto text-4xl px-5 py-5">
            <form className="flex justify-between space-x-2 my-5 mx-auto w-full">
            <input className="text-black bg-white border border-black rounded-3xl px-3 py-3" type="text" placeholder="organization name"></input>
                <input className="text-black bg-orange border rounded-3xl px-3 py-3 hover:border-black" type="submit" value="create"></input>
            </form>
		</div>
	);
}
