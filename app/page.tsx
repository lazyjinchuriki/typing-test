"use client"

import { useContext, useEffect } from "react"
import Header from "./components/Header"
import TypingArea from "./components/TypingArea"
import Stats from "./components/Stats"
import ResultModal from "./components/ResultModal"
import LoadingScreen from "./components/LoadingScreen"
import { ThemeProvider } from "./components/ThemeProvider"
import { AppContext } from "./context/appContext"

function HomeContent() {
  const { testCompleted, isLoading, setIsLoading } = useContext(AppContext)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [setIsLoading])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-bg-900 via-bg-800 to-bg-900">
        <Header />
        <main className="container mx-auto px-6 py-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <Stats />
            <TypingArea />
          </div>
        </main>
        {testCompleted && <ResultModal />}
      </div>
    </ThemeProvider>
  )
}

export default function Home() {
  return <HomeContent />
}
