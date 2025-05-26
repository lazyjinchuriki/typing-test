"use client"
import { useState, useEffect, useRef, useContext } from "react"
import type React from "react"

import { generateWords } from "../utils/words"
import { generateRandomCodeSnippet } from "../utils/codeSnippets"
import { AppContext } from "../context/appContext"

const TypingArea = () => {
  const {
    setWpm,
    setRawWpm,
    setAccuracy,
    setTimer,
    timer,
    duration,
    testCompleted,
    setTestCompleted,
    setCorrectChars,
    setIncorrectChars,
    setTotalChars,
    correctChars,
    incorrectChars,
    setCpm,
    testMode,
    codeLanguage,
  } = useContext(AppContext)

  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [startedTyping, setStartedTyping] = useState(false)
  const [wordStates, setWordStates] = useState<Array<"correct" | "incorrect" | "current" | "pending">>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize content based on test mode
  useEffect(() => {
    let newWords: string[] = []

    if (testMode === "words") {
      newWords = generateWords(200)
    } else {
      const { paragraph } = generateRandomCodeSnippet(codeLanguage)
      // Split by spaces but keep the spaces and special characters intact
      newWords = paragraph.split(/(\s+)/).filter((word) => word.trim() !== "")
    }

    setWords(newWords)
    setWordStates(new Array(newWords.length).fill("pending"))

    // Reset states
    setCurrentWordIndex(0)
    setCurrentCharIndex(0)
    setUserInput("")
    setStartedTyping(false)
    setCorrectChars(0)
    setIncorrectChars(0)
    setTotalChars(0)
  }, [testMode, codeLanguage, duration, setCorrectChars, setIncorrectChars, setTotalChars])

  // Global keydown listener to start typing on any letter
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        !testCompleted &&
        !startedTyping &&
        e.key.length === 1 && // Single character
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        setStartedTyping(true)
        if (inputRef.current) {
          inputRef.current.focus()
          setUserInput(e.key)
          setCurrentCharIndex(1)
        }
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [testCompleted, startedTyping])

  // Timer logic
  useEffect(() => {
    if (startedTyping && timer > 0 && !testCompleted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0 && startedTyping) {
      setTestCompleted(true)
    }
  }, [startedTyping, timer, testCompleted, setTimer, setTestCompleted])

  // Calculate stats
  useEffect(() => {
    if (startedTyping) {
      const timeElapsed = (duration - timer) / 60
      if (timeElapsed > 0) {
        const totalTypedChars = correctChars + incorrectChars
        const rawWpmCalc = Math.round(totalTypedChars / 5 / timeElapsed)
        const netWpmCalc = Math.round(correctChars / 5 / timeElapsed)
        const cpmCalc = Math.round(correctChars / timeElapsed)
        const accuracyCalc = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 100

        setRawWpm(rawWpmCalc)
        setWpm(netWpmCalc)
        setCpm(cpmCalc)
        setAccuracy(accuracyCalc)
        setTotalChars(totalTypedChars)
      }
    }
  }, [
    correctChars,
    incorrectChars,
    timer,
    duration,
    startedTyping,
    setRawWpm,
    setWpm,
    setCpm,
    setAccuracy,
    setTotalChars,
  ])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserInput(value)

    if (testCompleted || currentWordIndex >= words.length) return

    const currentWord = words[currentWordIndex]
    setCurrentCharIndex(value.length)

    // Count correct and incorrect characters for stats
    let correct = 0
    let incorrect = 0

    // Count all previously completed words
    for (let i = 0; i < currentWordIndex; i++) {
      if (wordStates[i] === "correct") {
        correct += words[i].length + 1 // +1 for space
      } else if (wordStates[i] === "incorrect") {
        incorrect += words[i].length + 1
      }
    }

    // Count current word characters
    for (let i = 0; i < value.length; i++) {
      if (i < currentWord.length && value[i] === currentWord[i]) {
        correct++
      } else {
        incorrect++
      }
    }

    setCorrectChars(correct)
    setIncorrectChars(incorrect)
  }

  // Handle space key (word completion)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (testCompleted) {
      e.preventDefault()
      return
    }

    if (e.key === " " && currentWordIndex < words.length) {
      e.preventDefault()

      const currentWord = words[currentWordIndex]
      const newWordStates = [...wordStates]

      // Mark current word as correct or incorrect
      if (userInput === currentWord) {
        newWordStates[currentWordIndex] = "correct"
      } else {
        newWordStates[currentWordIndex] = "incorrect"
      }

      setWordStates(newWordStates)
      setCurrentWordIndex((prev) => prev + 1)
      setCurrentCharIndex(0)
      setUserInput("")

      // Add space to stats
      setCorrectChars((prev) => prev + 1)
    }
  }

  // Focus input on mount and click
  useEffect(() => {
    if (inputRef.current && startedTyping) {
      inputRef.current.focus()
    }
  }, [startedTyping])

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  if (words.length === 0) {
    return <div className="text-center text-text-400">Loading...</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Instruction text above typing area */}
      {!startedTyping && !testCompleted && (
        <div className="text-center mb-6">
          <div className="text-lg text-text-300 mb-2">
            Start typing to begin the test
            <span className="typing-cursor text-primary-500 ml-1">|</span>
          </div>
          <div className="text-sm text-text-500">
            {testMode === "code" ? `Type the ${codeLanguage} code below` : "Type the words below"}
          </div>
        </div>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 pointer-events-none"
        disabled={testCompleted}
      />

      {/* Words display - Monkeytype style */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={`relative bg-surface-800/50 rounded-2xl p-8 min-h-[200px] cursor-text border border-surface-600/50 focus-within:border-primary-500/50 transition-all ${
          testMode === "code" ? "font-mono" : ""
        }`}
      >
        <div className={`text-2xl leading-relaxed ${testMode === "code" ? "font-mono" : ""}`}>
          {words.slice(0, 100).map((word, wordIndex) => {
            const isCurrentWord = wordIndex === currentWordIndex
            const wordState = wordStates[wordIndex]
            const isPastWord = wordIndex < currentWordIndex

            // Word styling based on state
            let wordClass = "relative inline-block mr-3 "

            if (isPastWord) {
              if (wordState === "correct") {
                wordClass += "text-text-100 " // Bright white for correct words
              } else {
                wordClass += "text-red-400 " // Red for incorrect words
              }
            } else if (isCurrentWord) {
              wordClass += "text-text-200 " // Slightly dimmed for current word
            } else {
              wordClass += "text-text-500 " // Very dim for future words
            }

            return (
              <span key={wordIndex} className={wordClass}>
                {word.split("").map((char, charIndex) => {
                  let charClass = "relative "

                  if (isCurrentWord) {
                    if (charIndex === currentCharIndex) {
                      // Current cursor position
                      charClass += "bg-primary-500 text-white animate-pulse "
                    } else if (charIndex < userInput.length) {
                      // Already typed in current word
                      if (userInput[charIndex] === char) {
                        charClass += "text-text-100 bg-green-500/20 "
                      } else {
                        charClass += "text-red-400 bg-red-500/20 "
                      }
                    }
                  }

                  return (
                    <span key={charIndex} className={charClass}>
                      {char}
                    </span>
                  )
                })}

                {/* Show extra characters for current word */}
                {isCurrentWord && userInput.length > word.length && (
                  <span className="text-red-400 bg-red-500/20">{userInput.slice(word.length)}</span>
                )}

                {/* Cursor at end of current word */}
                {isCurrentWord && currentCharIndex === word.length && (
                  <span className="bg-primary-500 text-white animate-pulse"> </span>
                )}
              </span>
            )
          })}
        </div>
      </div>

      {/* Reset button */}
      <div className="text-center mt-6">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-surface-700 hover:bg-surface-600 text-text-300 hover:text-white rounded-xl font-medium transition-all border border-surface-600"
        >
          Reset Test
        </button>
      </div>
    </div>
  )
}

export default TypingArea
