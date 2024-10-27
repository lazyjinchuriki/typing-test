import Head from "next/head";
import TypingTest from "./components/Typing";
import Stats from "./components/stats";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <div className="flex justify-center h-screen items-center bg-[rgb(246,246,247)] ">
        <div className="w-screen px-12 ">
          <div className="flex flex-col gap-2">
            <h6 className="text-center text-2xl font-bold text-[rgb(27,27,32)]">
              TYPING SPEED TEST
            </h6>
            <h1 className="bg-gradient-to-r from-orange-500 via-yellow-300 to-yellow-600 inline-block text-transparent bg-clip-text text-6xl font-bold text-center pb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Test your typing skills
            </h1>
            <Stats />
            <TypingTest />
          </div>
        </div>
      </div>
    </>
  );
}
