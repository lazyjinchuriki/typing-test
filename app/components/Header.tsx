"use client"
import { useContext, useState } from "react"
import { AppContext, type Theme, type CodeLanguage } from "../context/appContext"
import { RotateCcw, Palette, ChevronDown, Code, Type } from "lucide-react"

const Header = () => {
  const {
    theme,
    setTheme,
    testMode,
    setTestMode,
    codeLanguage,
    setCodeLanguage,
    setWpm,
    setCpm,
    setRawWpm,
    setAccuracy,
    setTestCompleted,
    setCorrectChars,
    setIncorrectChars,
    setTotalChars,
  } = useContext(AppContext)

  const [showThemes, setShowThemes] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)

  const themes: { id: Theme; name: string; description: string }[] = [
    { id: "matrix", name: "Matrix", description: "Green digital rain" },
    { id: "sage", name: "Sage Garden", description: "Natural earth tones" },
    { id: "mocha", name: "Mocha Latte", description: "Warm coffee vibes" },
    { id: "cyber", name: "Cyber Punk", description: "Neon future" },
    { id: "coral", name: "Coral Reef", description: "Ocean sunset vibes" },
  ]

  const languages: { id: CodeLanguage; name: string }[] = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "typescript", name: "TypeScript" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
    { id: "html", name: "HTML" },
    { id: "css", name: "CSS" },
  ]

  const resetTest = () => {
    setWpm(0)
    setCpm(0)
    setRawWpm(0)
    setAccuracy(100)
    setTestCompleted(false)
    setCorrectChars(0)
    setIncorrectChars(0)
    setTotalChars(0)
    window.location.reload()
  }

  return (
    <header className="w-full py-4 px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Unique Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="text-3xl font-bold font-mono">
              <span className="text-primary-500">{"{"}</span>
              <span className="text-accent-400 relative">
                funky
                <span className="absolute -top-1 -right-1 text-xs text-primary-300">_</span>
              </span>
              <span className="text-secondary-400">type</span>
              <span className="text-primary-500">{"}"}</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 via-accent-400 to-secondary-400 opacity-60"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Test Mode Toggle */}
          <div className="flex items-center bg-surface-800 rounded-lg p-1 border border-surface-600">
            <button
              onClick={() => setTestMode("words")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all text-sm ${
                testMode === "words" ? "bg-primary-500 text-white shadow-lg" : "text-text-400 hover:text-text-200"
              }`}
            >
              <Type size={14} />
              <span>Words</span>
            </button>
            <button
              onClick={() => setTestMode("code")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all text-sm ${
                testMode === "code" ? "bg-primary-500 text-white shadow-lg" : "text-text-400 hover:text-text-200"
              }`}
            >
              <Code size={14} />
              <span>Code</span>
            </button>
          </div>

          {/* Language Selector (only show when code mode is active) */}
          {testMode === "code" && (
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-text-300 hover:text-text-100 transition-all border border-surface-600"
              >
                <Code size={16} />
                <span className="text-sm font-medium">{languages.find((l) => l.id === codeLanguage)?.name}</span>
                <ChevronDown size={14} className={`transition-transform ${showLanguages ? "rotate-180" : ""}`} />
              </button>

              {showLanguages && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-surface-900 border border-surface-600 rounded-lg shadow-xl z-50">
                  {languages.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => {
                        setCodeLanguage(language.id)
                        setShowLanguages(false)
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-surface-700 transition-all first:rounded-t-lg last:rounded-b-lg ${
                        codeLanguage === language.id ? "bg-primary-500/20 text-primary-300" : "text-text-300"
                      }`}
                    >
                      <div className="font-medium text-sm">{language.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-text-300 hover:text-text-100 transition-all border border-surface-600"
            >
              <Palette size={16} />
              <span className="text-sm font-medium">{themes.find((t) => t.id === theme)?.name}</span>
              <ChevronDown size={14} className={`transition-transform ${showThemes ? "rotate-180" : ""}`} />
            </button>

            {showThemes && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-surface-900 border border-surface-600 rounded-lg shadow-xl z-50">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => {
                      setTheme(themeOption.id)
                      setShowThemes(false)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-surface-700 transition-all first:rounded-t-lg last:rounded-b-lg ${
                      theme === themeOption.id ? "bg-primary-500/20 text-primary-300" : "text-text-300"
                    }`}
                  >
                    <div className="font-medium">{themeOption.name}</div>
                    <div className="text-xs text-text-500">{themeOption.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={resetTest}
            className="p-2 rounded-lg text-text-400 hover:text-text-100 hover:bg-surface-700 transition-all"
            title="Reset Test"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
