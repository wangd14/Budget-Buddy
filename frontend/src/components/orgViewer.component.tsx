import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faX, faTrash, faPersonRunning, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type orgIDName = {
  oid: Number;
  orgname: string;
  access: Number;
};

type showConfirmLeavePopup = {
  isActive: boolean;
  OrgID: Number;
};

type showConfirmDeletePopup = {
  isActive: boolean;
  OrgID: Number;
};

export default function OrgViewer() {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmLeavePopup, setConfirmLeavePopup] =
    useState<showConfirmLeavePopup>({
      isActive: false,
      OrgID: 0, // Or set an initial value for `value` if needed
    });

  const handleLeaving = (newValue: Number) => {
    // Adjust `newValue` type if needed
    setConfirmLeavePopup((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
      OrgID: newValue,
    }));
  };
  const handleToggleLeaving = () => {
    setConfirmLeavePopup({
      isActive: !showConfirmLeavePopup.isActive,
      OrgID: 0, // Update value here if needed
    });
  };

  const [showConfirmDeletePopup, setConfirmDeletePopup] =
    useState<showConfirmDeletePopup>({
      isActive: false,
      OrgID: 0, // Or set an initial value for `value` if needed
    });
  const handleDeleting = (newValue: Number) => {
    // Adjust `newValue` type if needed
    setConfirmDeletePopup((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
      OrgID: newValue,
    }));
  };
  const handleToggleDeleting = () => {
    setConfirmDeletePopup({
      isActive: !showConfirmDeletePopup.isActive,
      OrgID: 0, // Update value here if needed
    });
  };
  const auth: any = useAuthContext();
  const router = useRouter();

  const [organizationName, setOrganizationName] = useState<string>("");

  const [orgNames, setOrgNames] = useState<orgIDName[]>([]);

  const getTextRole = (role: Number) => {
    if (role == 2) {
      return "Owner";
    } else if (role == 1) {
      return "Admin";
    } else {
      return "Member";
    }
  };

  const updateOrgViews = async () => {
    const response = await fetch(
      "http://localhost:3000/user/" + auth.user.uid + "?token=atoken"
    );
    const data = await response.json();
    const orgNames = await Promise.all(
      data.data.orgs.map(async (orgId: string) => {
        const orgResponse = await fetch(
          "http://localhost:3000/org/" + orgId + "?token=atoken"
        );
        const orgData = await orgResponse.json();

        const accessResponse = await fetch(
          `http://localhost:3000/org/${orgId}/user/${auth.user.uid}`
        );
        const accessData = await accessResponse.json();

        // const orgUser = await fetch(`http://localhost:3000/org/${orgId}/user/${auth.user.uid}`)
        // console.log(await orgUser.json());
        const returnData = {
          oid: orgId,
          orgname: orgData.data.orgname,
          access: accessData.data.admin,
        };
        return returnData;
      })
    );
    setOrgNames(orgNames);
  };

  const deleteOrg = async (oid: Number) => {
    console.log("Inside delete Org");
    await fetch(
      `http://localhost:3000/org/${oid}/?token=${auth.user.accessToken}`,
      {
        method: "DELETE",
      }
    );
    handleToggleDeleting();
    updateOrgViews();
  };

  const leaveOrg = async (oid: Number) => {
    console.log("Inside Leave Org");
    await fetch(`http://localhost:3000/org/${oid}/user/${auth.user.uid}?token=${auth.user.accessToken}`,{
      method: "DELETE"
    });
    handleToggleLeaving();
    updateOrgViews();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("We got a submission");

    //Creates the org
    const postResponse = await fetch(`http://localhost:3000/org?token=${auth.user.accessToken}`,{
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", //application/x-www-form-urlencoded
      },
      body: JSON.stringify({
        orgname: (e.currentTarget.elements[0] as HTMLInputElement).value,
        uid: auth.user.uid,
      }),
    });

    //Update the display for the orgs
    setShowPopup(false);

    updateOrgViews();

    // e.currentTarget.reset();
    setOrganizationName("");
  };

  useEffect(() => {
    const fetchOrgs = async () => {
      const response = await fetch(
        "http://localhost:3000/user/" + auth.user.uid + "?token=atoken"
      );
      const data = await response.json();
      const orgNames = await Promise.all(
        data.data.orgs.map(async (orgId: string) => {
          const orgResponse = await fetch(
            "http://localhost:3000/org/" + orgId + "?token=atoken"
          );
          const orgData = await orgResponse.json();

          const accessResponse = await fetch(
            `http://localhost:3000/org/${orgId}/user/${auth.user.uid}`
          );
          const accessData = await accessResponse.json();

          // const orgUser = await fetch(`http://localhost:3000/org/${orgId}/user/${auth.user.uid}`)
          // console.log(await orgUser.json());
          const returnData = {
            oid: orgId,
            orgname: orgData.data.orgname,
            access: accessData.data.admin,
          };
          return returnData;
        })
      );
      setOrgNames(orgNames);
    };
    fetchOrgs();
  }, [auth.user.uid]);

  return (
    <div className="rounded-2xl w-11/12 sm:w-5/6 m-auto mt-10 border">
      <div className="flex flex-col md:flex-row justify-between mx-10 items-center">
        <div className="flex text-2xl sm:text-4xl font-bold my-5">Organizations</div>
        <p onClick={() => setShowPopup(true)} 
          className="flex justify-center rounded-lg border-2 w-full md:w-fit border-green-500 p-2 hover:bg-green-500 cursor-pointer mb-1">
          Create Organization
        </p>
      </div>
      <div className="m-10 mt-0 border-t pt-3 pl-1">
        {orgNames.map((org, index) => (
          <div key={index} className="flex flex-col sm:flex-row justify-start sm:justify-between items-start mb-1">
            <p onClick={() => router.push(`/organization/${org.oid}`)}
              className="flex cursor-pointer text-lg font-semibold hover:underline text-left">
              {org.orgname}
            </p>
            <div className="flex justify-between items-center w-full sm:w-1/2">
              <p className="text-left italic">{getTextRole(org.access)}</p>
              {org.access == 2 && (
                <div onClick={() => handleDeleting(org.oid)} className="flex justify-between round border-2 border-red-500 rounded-lg text-center cursor-pointer hover:bg-red-500 p-1">
                  <p className="hidden sm:flex justify-center">Delete?</p>
                  <FontAwesomeIcon icon={faTrash} className="sm:hidden" />
                </div>
              )}
              {org.access != 2 && (
                <div onClick={() => handleLeaving(org.oid)} className="flex justify-between round border-2 border-red-500 rounded-lg text-center cursor-pointer hover:bg-red-500 p-1">
                  <p className="hidden sm:flex justify-center">Leave?</p>
                  <FontAwesomeIcon icon={faRightFromBracket} className="sm:hidden"/>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Create Organization</h2>
              <FontAwesomeIcon icon={faX} onClick={() => setShowPopup(false)}
                className="text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1"/>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              <label className="mb-2">Organization name:</label>
              <input
                className="border rounded-md p-2 mb-4 text-black"
                type="text"
                id="name"
                name="name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Organization Name"
              ></input>
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
      {showConfirmLeavePopup.isActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Are you sure you want to leave this organization?
              </h2>
              <FontAwesomeIcon
                icon={faX}
                className="text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1"
                onClick={handleToggleLeaving}
              />
            </div>

            <div className="flex w-full justify-between">
              <button
                className="flex items-center w-1/2 bg-gray-600 text-white font-bold mr-2 py-2 px-4 rounded hover:bg-gray-700"
                type="submit"
                onClick={handleToggleLeaving}
              >
                No, don&apos;t leave
              </button>
              <button
                className="flex items-center w-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                type="submit"
                onClick={() => {
                  leaveOrg(showConfirmLeavePopup.OrgID);
                }}
              >
                <p>Yes, leave</p>
                <FontAwesomeIcon
                  icon={faPersonRunning}
                  className="text-2xl scale-y-1 ml-auto cursor-pointer p-1"
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmDeletePopup.isActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Are you sure you want to DELETE this organization?
              </h2>
              <FontAwesomeIcon
                icon={faX}
                className="text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1"
                onClick={handleToggleDeleting}
              />
            </div>

            <div className="flex w-full justify-between">
              <button
                className="flex items-center w-1/2 bg-gray-600 text-white font-bold mr-2 py-2 px-4 rounded hover:bg-gray-700"
                type="submit"
                onClick={handleToggleDeleting}
              >
                No, don&apos;t delete
              </button>
              <button
                className="flex items-center w-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                type="submit"
                onClick={() => {
                  deleteOrg(showConfirmDeletePopup.OrgID);
                }}
              >
                <p>Yes, delete</p>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-2xl scale-y-1 ml-auto cursor-pointer p-1"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//for small and medium screens -> the
