"use client"
import { useContext } from "react"
import { AppContext, type Duration } from "../context/appContext"

const Stats = () => {
  const { timer, wpm, cpm, rawWpm, accuracy, duration, setDuration, setTimer } = useContext(AppContext)

  // Make the durations look like random numbers
  const timeOptions = [
    { value: 15 as Duration, display: "15", label: "quick burst" },
    { value: 30 as Duration, display: "30", label: "standard" },
    { value: 60 as Duration, display: "60", label: "endurance" },
  ]

  const progress = ((duration - timer) / duration) * 100

  const handleDurationChange = (newDuration: Duration) => {
    setDuration(newDuration)
    setTimer(newDuration)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Duration Selection - looks like random numbers */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-1 bg-surface-800/50 rounded-xl p-1 border border-surface-600">
          {timeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleDurationChange(option.value)}
              className={`group relative px-6 py-3 rounded-lg font-mono text-lg font-bold transition-all ${
                duration === option.value
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "text-text-400 hover:text-text-100 hover:bg-surface-700"
              }`}
            >
              <span className="relative z-10">{option.display}</span>
              <div className={`absolute inset-0 rounded-lg transition-all ${
                duration === option.value 
                  ? "bg-gradient-to-r from-primary-500 to-accent-500" 
                  : "group-hover:bg-surface-600/50"
              }`}></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-text-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Timer and Progress */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-text-100 mb-2 font-mono relative">
          {timer}
          <span className="absolute -top-2 -right-4 text-lg text-text-500">s</span>
        </div>
        <div className="w-full max-w-md mx-auto h-2 bg-surface-700 rounded-full overflow-hidden border border-surface-600">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-8 text-center">
        <div className="group">
          <div className="text-3xl font-bold text-primary-500 font-mono group-hover:scale-110 transition-transform">
            {wpm}
          </div>
          <div className="text-sm text-text-400 uppercase tracking-wider">wpm</div>
        </div>
        <div className="group">
          <div className="text-3xl font-bold text-accent-500 font-mono group-hover:scale-110 transition-transform">
            {cpm}
          </div>
          <div className="text-sm text-text-400 uppercase tracking-wider">cpm</div>
        </div>
        <div className="group">
          <div className="text-3xl font-bold text-secondary-500 font-mono group-hover:scale-110 transition-transform">
            {accuracy}%
          </div>
          <div className="text-sm text-text-400 uppercase tracking-wider">acc</div>
        </div>
        <div className="group">
          <div className="text-3xl font-bold text-text-400 font-mono group-hover:scale-110 transition-transform">
            {rawWpm}
          </div>
          <div className="text-sm text-text-400 uppercase tracking-wider">raw</div>
        </div>
      </div>
    </div>
  )
}

export default Stats
