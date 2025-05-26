"use client"
import { useContext, useRef } from "react"
import { AppContext } from "../context/appContext"
import { Download, RotateCcw, Zap, Target, Type, Clock } from "lucide-react"
import html2canvas from "html2canvas"

const ResultModal = () => {
  const { wpm, cpm, rawWpm, accuracy, duration, correctChars, incorrectChars, testMode, codeLanguage } =
    useContext(AppContext)
  const cardRef = useRef<HTMLDivElement>(null)

  const downloadResult = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: "#0A0A0A",
          scale: 2,
        })

        const link = document.createElement("a")
        link.download = `funkytype-result-${Date.now()}.png`
        link.href = canvas.toDataURL()
        link.click()
      } catch (error) {
        console.error("Error generating image:", error)
      }
    }
  }

  const resetTest = () => {
    window.location.reload()
  }

  const getPerformanceLevel = () => {
    if (wpm >= 70) return { level: "ELITE", color: "from-purple-500 to-pink-500", glow: "shadow-purple-500/50" }
    if (wpm >= 50) return { level: "PRO", color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/50" }
    if (wpm >= 30) return { level: "GOOD", color: "from-green-500 to-emerald-500", glow: "shadow-green-500/50" }
    return { level: "NOOB", color: "from-orange-500 to-red-500", glow: "shadow-orange-500/50" }
  }

  const performance = getPerformanceLevel()

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="relative">
        {/* Animated background rings */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="w-80 h-80 border border-primary-500/30 rounded-full"></div>
        </div>
        <div className="absolute inset-2 animate-spin-reverse">
          <div className="w-76 h-76 border border-accent-500/20 rounded-full"></div>
        </div>

        {/* Main card */}
        <div className="relative bg-gradient-to-br from-bg-900 via-bg-800 to-bg-900 rounded-3xl p-6 w-80 border border-primary-500/50 shadow-2xl">
          <div ref={cardRef} className="space-y-4">
            {/* Header with glitch effect */}
            <div className="text-center relative">
              <div
                className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${performance.color} text-white font-bold text-sm mb-3 ${performance.glow} shadow-lg animate-pulse`}
              >
                {performance.level}
              </div>
              <h2 className="text-xl font-bold text-white mb-1 font-mono relative">
                TEST COMPLETE
                <div className="absolute inset-0 text-primary-500 opacity-30 animate-pulse">TEST COMPLETE</div>
              </h2>
              <p className="text-text-400 text-sm">
                {testMode === "code" ? `${codeLanguage.toUpperCase()} CODE` : "WORDS"} • {duration}s
              </p>
            </div>

            {/* Main stats in compact grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-surface-800 to-surface-900 rounded-xl p-4 border border-primary-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-primary-500/20 rounded-full blur-xl"></div>
                <Zap className="w-4 h-4 text-primary-500 mb-1" />
                <div className="text-2xl font-bold text-white font-mono">{wpm}</div>
                <div className="text-xs text-text-500 uppercase tracking-wider">WPM</div>
              </div>

              <div className="bg-gradient-to-br from-surface-800 to-surface-900 rounded-xl p-4 border border-accent-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-accent-500/20 rounded-full blur-xl"></div>
                <Target className="w-4 h-4 text-accent-500 mb-1" />
                <div className="text-2xl font-bold text-white font-mono">{accuracy}%</div>
                <div className="text-xs text-text-500 uppercase tracking-wider">ACC</div>
              </div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-surface-800/50 rounded-lg p-3 text-center border border-surface-600/50">
                <Type className="w-3 h-3 text-secondary-500 mx-auto mb-1" />
                <div className="text-lg font-bold text-white font-mono">{cpm}</div>
                <div className="text-xs text-text-500">CPM</div>
              </div>
              <div className="bg-surface-800/50 rounded-lg p-3 text-center border border-surface-600/50">
                <Clock className="w-3 h-3 text-text-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white font-mono">{rawWpm}</div>
                <div className="text-xs text-text-500">RAW</div>
              </div>
              <div className="bg-surface-800/50 rounded-lg p-3 text-center border border-surface-600/50">
                <div className="w-3 h-3 bg-primary-500 rounded-full mx-auto mb-1"></div>
                <div className="text-lg font-bold text-white font-mono">{correctChars}</div>
                <div className="text-xs text-text-500">CHARS</div>
              </div>
            </div>

            {/* Accuracy bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-text-500">
                <span>ACCURACY</span>
                <span>{accuracy}%</span>
              </div>
              <div className="w-full h-2 bg-surface-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000 ease-out relative"
                  style={{ width: `${accuracy}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-2 border-t border-surface-700/50">
              <p className="text-xs text-text-500 font-mono">funkytype • {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-4">
            <button
              onClick={downloadResult}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg hover:shadow-primary-500/25"
            >
              <Download size={16} />
              <span className="text-sm">SAVE</span>
            </button>
            <button
              onClick={resetTest}
              className="flex-1 flex items-center justify-center space-x-2 bg-surface-700 hover:bg-surface-600 text-white px-4 py-2 rounded-xl font-medium transition-all border border-surface-600"
            >
              <RotateCcw size={16} />
              <span className="text-sm">RETRY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
