'use client'  
import Navbar from "@/components/navbar.component"
import signUp from "@/firebase/auth/signup"
import signIn from "@/firebase/auth/signin"
import deleteAccount from "@/firebase/auth/deleteAccount"
import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import logOut from "@/firebase/auth/logout"

export default function Page() {

  //if user is already logged in, no need to access sign in page
  const {user}: any = useAuthContext()
  const router = useRouter()
  useEffect(() => {
    if (user) router.push("/welcome")
      
  }, [router,user])

  const [page, setPage] = useState<string>("signUp")      //display either logIn or SignUp
  const [submitText, setSubmitText] = useState<string>("Log In")      //submit button text
  const [toggleText, setToggleText] = useState<string>("Don't have an account?")  //text below submit button
  const [welcome, setWelcome] = useState<string>("Welcome back!")
  const [httpMethod, setHttpMethod] = useState<string>("GET")   //http method sent to server
  
  //form data
  const [fname, setFname] = useState<string>("")   //first name
  const [lname, setLname] = useState<string>("")   //last name
  const [email, setEmail] = useState<string>("")   //email
  const [pword, setPword] = useState<string>("")   //password
  const [cnfrm, setCnfrm] = useState<string>("")   //confirm password
  //form data on client side (the input bars)
  const [fnameVal, setFnameVal] = useState<string>("")   //first name
  const [lnameVal, setLnameVal] = useState<string>("")   //last name
  const [emailVal, setEmailVal] = useState<string>("")   //email
  const [pwordVal, setPwordVal] = useState<string>("")   //password
  const [cnfrmVal, setCnfrmVal] = useState<string>("")   //confirm password
  
  //response data
  const [response, setResponse] = useState<string | TrustedHTML>("")

  //switch between forms
  const toggleForm = useCallback(() => {
    clearData()
    if (page === "logIn") {
      document.getElementById("firstname")?.classList.remove("hidden")
      document.getElementById("lastname")?.classList.remove("hidden")
      document.getElementById("cpword")?.classList.remove("hidden")
      document.getElementById("email")?.classList.remove("hidden")
      setToggleText("Already have an account?")
      setSubmitText("Sign Up")
      setWelcome("Welcome!")
      setPage("signUp")
      setHttpMethod("POST")
    } else {
      document.getElementById("firstname")?.classList.add("hidden")
      document.getElementById("lastname")?.classList.add("hidden")
      document.getElementById("cpword")?.classList.add("hidden")
      setToggleText("Don't have an account?")
      setSubmitText("Log In")
      setWelcome("Welcome back!")
      setPage("logIn")
      setHttpMethod("GET")
    }
  },[page])

  const validateForm = () => {
    let error = ""
    if (httpMethod === "GET"){
      //something hasnt been set
      if (email == "") error += "Please enter your password<br />"
      if (pword == "") error += "Please enter your password<br />"
    } else {
      //something hasnt been set
      if (fname == "") error += "Please enter your first name<br />"
      if (lname == "") error += "Please enter your last name<br />"
      if (email == "") error += "Please enter your email<br />"
      if (pword == "") error += "Please choose a password<br />"
      if (cnfrm == "") error += "Please retype your password<br />"
    }
    return error
  }

  //send request to the server
  const sendReq = async () => {
    setResponse("")
    //validate before sending the request
    const error = validateForm()
    if (error != ""){
      setResponse(error)
      return
    }
    if (httpMethod == "GET"){
      //sign the user in through firebase - no need to send req to server
      const {result, error}: any = await signIn(email,pword)
      if (error) {
        console.log(error);
        setResponse(error);
      }
      else if (result){
        router.push('/welcome')
        console.log("result ",result)
        let t = result.accessToken 
        const response: Response = await fetch("./auth?type=signin", {  
          method: "POST",
          body: JSON.stringify({
            token: result.accessToken
          })
        })
        if (response.status != 200){ //server request was not successful
          await logOut()
          router.push('/')
        }
        const data = await response.json()
      } 
      
    } else { //POST
      //first add the account to firebase
      const {result, error}: any = await signUp(email,pword)
      if (error){
        console.log(error)
        setResponse(error)
        return
      }
      else if (result) {
        router.push('/welcome')
        //then post to our node server
        let formData = new URLSearchParams();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('email', email);
        formData.append('uid',result.user.uid.toString())
        formData.append('token',result.accessToken)
        const response: Response = await fetch('./auth?type=signup', {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },  
          body: formData.toString()
        })
        if (response.status  == 200){
          await deleteAccount()
        }
      }
    }

  }
  
  const clearData = () => {
    setFname("")
    setLname("")
    setEmail("")
    setPword("")
    setCnfrm("")
    //set input fields to nothing
    setFnameVal("")
    setLnameVal("")
    setEmailVal("")
    setPwordVal("")
    setCnfrmVal("")
    //set response to nothing
    setResponse("")
  }



  //activate when page loads
  useEffect(() => {
    toggleForm()
  }, [])

  return (
    <div className="h-full">
      <Navbar />
      <div id="main" className="w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/5 mx-auto border rounded-md p-8 mt-16">
        <p id="welcome_text" className="text-3xl">{welcome}</p>
        <hr className="mb-2" />

        <div id="firstname" className="flex items-center mb-4">
          <label htmlFor="fname" className="hidden sm:block w-1/4">First Name: &nbsp;</label>
          <input id="fname" type="text" name="fname" placeholder="First Name" value={fnameVal} onChange={(event) => {setFnameVal(event.target.value);setFname(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        <div id="lastname" className="flex items-center mb-4">
          <label htmlFor="lname" className="hidden sm:block w-1/4">Last Name: &nbsp;</label>
          <input id="lname" type="text" name="lname" placeholder="Last Name" value={lnameVal} onChange={(event) => {setLnameVal(event.target.value);setLname(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        <div id="email" className="flex items-center mb-4">
          <label htmlFor="email" className="hidden sm:block w-1/4" >Email: &nbsp;</label>
          <input id="email" type="email" name="email" placeholder="Email" value={emailVal} onChange={(event) => {setEmailVal(event.target.value);setEmail(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        <div id="pword" className="flex items-center mb-4">
          <label htmlFor="password" className="hidden sm:block w-1/4">Password: &nbsp;</label>
          <input id="password" type="password" name="password" placeholder="Password" value={pwordVal} onChange={(event) => {setPwordVal(event.target.value);setPword(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        <div id="cpword" className="flex items-center mb-4">
          <label htmlFor="confirmPassword" className="hidden sm:block w-1/4">Confirm Password: &nbsp;</label>
          <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" value={cnfrmVal} onChange={(event) => {setCnfrmVal(event.target.value);setCnfrm(event.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        <button id="submit" onClick={sendReq} className="w-full border-2 hover:bg-white hover:text-black font-semibold py-1 rounded-md">{submitText}</button>
        <div className="flex justify-center mb-2">
          <p onClick={() => toggleForm()} className="italic text-center hover:font-semibold hover:cursor-pointer">{toggleText}</p>
        </div>
        <div id="response" className="text-white rounded w-1/2 mx-auto italic text-center">
          <p dangerouslySetInnerHTML={{__html: response}}></p>
        </div>
      </div>
    </div>
  )
}