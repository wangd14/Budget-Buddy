import Button from "../components/button.component";

export default function Home() {
  
  return (
    <div id="main" className="flex h-screen bg-gradient-to-tr from-ocean via-80% via-sky-700/80 to-ocean text-white">
      <div className="m-auto w-4/5 lg:w-3/5 xl:w-1/2 text-center">
        <p className="text-4xl sm:text-8xl font-bold p-4 bg-clip-text bg-gradient-to-b from-white to-white text-transparent w-fit mx-auto">Budget Buddy</p>
        <p className="text-lg sm:text-2xl my-8">Your Financial Companion -<br /> <em>Every Step of the Way</em></p>
        <div className="mx-auto flex justify-center ">
          <Button text="Start Saving Today!" url="signin"></Button>
        </div>
      </div>
    </div>
  );
}
