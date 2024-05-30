'use client'
import Image from "next/image"
import Navbar from "../../components/navbar.component"
import receipt from "@/images/receipt-example.webp"
import Item from "@/components/item.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  
  //user must be logged in to view this page
  const {user}: any = useAuthContext()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.push("/")
  }, [router,user])

  return (
    <>
      <Navbar showProfile />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex">
          <div id="scan" className="flex flex-col flex-[50%] p-4">
            <p className="text-3xl font-bold mt-4">Upload File:</p>
            <hr className="mb-2" />
            <div className="flex justify-center mb-2">
              <p>File uploaded:&nbsp;</p>
              <p className="italic text-green-600 text-center ">receipt.png</p>
            </div>
            <div className="mx-auto items-center justify-center h-auto max-h-[60vh]">
              <div className="h-full w-full rounded-md bg-gradient-to-r from-orange via-white to-blue  p-1">
                <div className="flex h-full w-full items-center justify-center bg-top">
                  <Image src={receipt} alt="receipt-example" className="h-full w-full object-cover bg-top rounded-md" />
                </div>
              </div>
            </div>
          </div>
          <div id="found" className="flex-[50%] p-4">
            <div className="flex justify-between items-center mt-4">
              <p className="text-3xl font-bold">We Found: </p>
              <p className="text-lg font-bold mt-auto hover:bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:text-transparent hover:bg-clip-text hover:cursor-pointer">Verify All </p>
            </div>
            <hr className="mb-2" />
            <Item name="Vinyl Gloves" price={-11.72} />
            <Item name="Ajax Dishlim" price={-2.96} />
            <Item name="Advil Dual18" price={-3.98} />
            <Item name="MCC/SCH Pars" price={-2.44} />
            <Item name="Vinyl Gloves" price={-11.72} />

          </div>
        </div>
        <div className="flex justify-center text-3xl">
          <button className="p-2 bg-white text-black rounded-2xl w-fit mx-auto my-4 hover:bg-gradient-to-br from-red-700 via-purple-700 to-blue-700 hover:text-white">
            <FontAwesomeIcon icon={faCamera} className="mx-1" />
          </button>
        </div>
      </main>
    </>
  )
}