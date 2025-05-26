"use client"
import { useState, useEffect, useRef, useContext } from "react"
import { generateRandomParagraph } from "../utils/paragraph"
import { generateRandomCodeSnippet } from "../utils/codeSnippets"
import { unsupportedKeys } from "../utils/unsupportedkeys"
import { AppContext } from "../context/appContext"
import { Merriweather, JetBrains_Mono } from "next/font/google"
import ResultCard from "./ResultCard"

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

const TypingTest = () => {
  const {
    setWpm,
    setCpm,
    setAccuracy,
    setTimer,
    timer,
    duration,
    testMode,
    codeLanguage,
    testCompleted,
    setTestCompleted,
  } = useContext(AppContext)

  const [startedTyping, setStartedTyping] = useState<boolean>(false)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>("")
  const [state, setState] = useState<{
    letterIndex: number
    wordsMap: Map<
      number,
      {
        typedLetter: string
        supposedToBe: string
      }
    >
  }>({
    letterIndex: 0,
    wordsMap: new Map<
      number,
      {
        typedLetter: string
        supposedToBe: string
      }
    >(),
  })

  // Generate content based on test mode
  useEffect(() => {
    if (testMode === "words") {
      const { paragraph } = generateRandomParagraph()
      setContent(paragraph)
    } else {
      const { paragraph } = generateRandomCodeSnippet(codeLanguage)
      setContent(paragraph)
    }

    // Reset state when content changes
    setState({
      letterIndex: 0,
      wordsMap: new Map(),
    })
    setStartedTyping(false)
  }, [testMode, codeLanguage, duration])

  useEffect(() => {
    if (timer <= 0 && startedTyping) {
      setTestCompleted(true)
      setStartedTyping(false)
    } else if (timer > 0) {
      window.addEventListener("keydown", handleKeyPress)
      cursorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
      return () => {
        window.removeEventListener("keydown", handleKeyPress)
      }
    }
  }, [state, timer, startedTyping])

  useEffect(() => {
    if (startedTyping && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [startedTyping, timer])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (unsupportedKeys.includes(e.key) || testCompleted) return

    const letters = content.split("")

    if (!startedTyping) {
      setStartedTyping(true)
    }

    // Calculate stats
    const typedLetters = Array.from(state.wordsMap.values()).map((letter) => letter.typedLetter)
    const typedWords = typedLetters
      .join("")
      .split(" ")
      .filter((word) => word !== "")
    const supposedToBeLetter = Array.from(state.wordsMap.values()).map((letter) => letter.supposedToBe)
    const supposedToBeWords = supposedToBeLetter
      .join("")
      .split(" ")
      .filter((word) => word !== "")
    const correctWords = supposedToBeWords.filter((word, index) => word === typedWords[index])

    const accuracy =
      supposedToBeWords.length > 0 ? Math.floor((correctWords.length / supposedToBeWords.length) * 100) : 0

    // Calculate WPM and CPM based on time elapsed
    const timeElapsed = (duration - timer) / 60 // in minutes
    const currentWpm = timeElapsed > 0 ? Math.floor(correctWords.length / timeElapsed) : 0
    const currentCpm = timeElapsed > 0 ? Math.floor(correctWords.join("").length / timeElapsed) : 0

    if (e.key === " " || timeElapsed > 0) {
      setWpm(currentWpm)
      setCpm(currentCpm)
      setAccuracy(accuracy)
    }

    if (e.key !== "Backspace") {
      if (state.letterIndex < letters.length) {
        setState((prev) => ({
          ...prev,
          letterIndex: prev.letterIndex + 1,
          wordsMap: prev.wordsMap.set(prev.letterIndex, {
            typedLetter: e.key,
            supposedToBe: letters[prev.letterIndex],
          }),
        }))
      }
    } else if (e.key === "Backspace" && state.letterIndex > 0) {
      setState((prev) => {
        const newMap = new Map(prev.wordsMap)
        newMap.delete(prev.letterIndex - 1)
        return {
          ...prev,
          letterIndex: prev.letterIndex - 1,
          wordsMap: newMap,
        }
      })
    }
  }

  const resetTest = () => {
    setState({
      letterIndex: 0,
      wordsMap: new Map(),
    })
    setStartedTyping(false)
    setTimer(duration)
    setWpm(0)
    setCpm(0)
    setAccuracy(0)
    setTestCompleted(false)

    if (testMode === "words") {
      const { paragraph } = generateRandomParagraph()
      setContent(paragraph)
    } else {
      const { paragraph } = generateRandomCodeSnippet(codeLanguage)
      setContent(paragraph)
    }
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        {/* Test Instructions */}
        {!startedTyping && (
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {testMode === "code" ? "Type the code snippet below" : "Type the paragraph below"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Start typing to begin the {duration}-second test</p>
          </div>
        )}

        {/* Typing Area */}
        <div
          ref={containerRef}
          className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 min-h-[300px] overflow-hidden ${
            testMode === "code" ? jetbrainsMono.className : merriweather.className
          }`}
        >
          <div className="relative leading-relaxed text-lg">
            {content.split("").map((letter, letterIndex) => {
              const isCurrentLetter = letterIndex === state.letterIndex
              const typedData = state.wordsMap.get(letterIndex)

              let letterClass = "relative "

              if (isCurrentLetter) {
                letterClass += "text-blue-500 dark:text-blue-400 "
              } else if (letterIndex < state.letterIndex) {
                if (typedData?.typedLetter === typedData?.supposedToBe) {
                  letterClass += "text-gray-400 dark:text-gray-500 bg-green-100 dark:bg-green-900/20 "
                } else {
                  letterClass += "text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/20 "
                }
              } else {
                letterClass += "text-gray-700 dark:text-gray-300 "
              }

              return (
                <span key={letterIndex} className={letterClass}>
                  {isCurrentLetter && (
                    <span
                      ref={cursorRef}
                      className="absolute -left-0.5 top-0 w-0.5 h-full bg-blue-500 dark:bg-blue-400 animate-pulse"
                    />
                  )}
                  {letter === " " ? "\u00A0" : letter}
                </span>
              )
            })}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center mt-8">
          <button
            onClick={resetTest}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
          >
            Reset Test
          </button>
        </div>
      </div>

      {/* Result Modal */}
      {testCompleted && <ResultCard />}
    </>
  )
}

export default TypingTest
