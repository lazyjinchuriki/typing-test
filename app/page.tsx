import TypingTest from "./components/Typing";
import Stats from "./components/stats";

export default function Home() {
  return (
    <div className="flex justify-center h-screen items-center bg-[rgb(246,246,247)] ">
      <div className='w-screen px-12 '>
        <div className="flex flex-col gap-2">
          <h6 className='text-center font-light'>TYPING SPEED TEST</h6>
          <h1 className='text-6xl font-bold text-center'>Test your typing skills</h1>
          <Stats />
          <TypingTest />
        </div>


      </div>
    </div>
  )
}
