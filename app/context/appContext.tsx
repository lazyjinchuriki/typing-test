"use client"
import type React from "react"
import { createContext, useMemo, useState } from "react"

export type Duration = 15 | 30 | 60
export type Theme = "matrix" | "sage" | "mocha" | "cyber" | "coral"
export type TestMode = "words" | "code"
export type CodeLanguage = "javascript" | "python" | "typescript" | "java" | "cpp" | "html" | "css"

export const AppContext = createContext({
  wpm: 0,
  setWpm: (wpm: number) => {},
  cpm: 0,
  setCpm: (cpm: number) => {},
  rawWpm: 0,
  setRawWpm: (rawWpm: number) => {},
  accuracy: 0,
  setAccuracy: (accuracy: number) => {},
  timer: 30,
  setTimer: (timer: number | ((prevTimer: number) => number)) => {},
  duration: 30 as Duration,
  setDuration: (duration: Duration) => {},
  theme: "matrix" as Theme,
  setTheme: (theme: Theme) => {},
  testMode: "words" as TestMode,
  setTestMode: (mode: TestMode) => {},
  codeLanguage: "javascript" as CodeLanguage,
  setCodeLanguage: (language: CodeLanguage) => {},
  testCompleted: false,
  setTestCompleted: (completed: boolean) => {},
  correctChars: 0,
  setCorrectChars: (chars: number) => {},
  incorrectChars: 0,
  setIncorrectChars: (chars: number) => {},
  totalChars: 0,
  setTotalChars: (chars: number) => {},
  isLoading: true,
  setIsLoading: (loading: boolean) => {},
})

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [wpm, setWpm] = useState<number>(0)
  const [cpm, setCpm] = useState<number>(0)
  const [rawWpm, setRawWpm] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(100)
  const [timer, setTimer] = useState<number>(30)
  const [duration, setDuration] = useState<Duration>(30)
  const [theme, setTheme] = useState<Theme>("matrix")
  const [testMode, setTestMode] = useState<TestMode>("words")
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>("javascript")
  const [testCompleted, setTestCompleted] = useState<boolean>(false)
  const [correctChars, setCorrectChars] = useState<number>(0)
  const [incorrectChars, setIncorrectChars] = useState<number>(0)
  const [totalChars, setTotalChars] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const value = useMemo(
    () => ({
      wpm,
      setWpm,
      cpm,
      setCpm,
      rawWpm,
      setRawWpm,
      accuracy,
      setAccuracy,
      timer,
      setTimer,
      duration,
      setDuration,
      theme,
      setTheme,
      testMode,
      setTestMode,
      codeLanguage,
      setCodeLanguage,
      testCompleted,
      setTestCompleted,
      correctChars,
      setCorrectChars,
      incorrectChars,
      setIncorrectChars,
      totalChars,
      setTotalChars,
      isLoading,
      setIsLoading,
    }),
    [
      wpm,
      cpm,
      rawWpm,
      accuracy,
      timer,
      duration,
      theme,
      testMode,
      codeLanguage,
      testCompleted,
      correctChars,
      incorrectChars,
      totalChars,
      isLoading,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
