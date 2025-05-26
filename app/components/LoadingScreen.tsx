"use client"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showMatrix, setShowMatrix] = useState(true)

  const loadingSteps = [
    "Initializing neural pathways...",
    "Loading typing algorithms...",
    "Calibrating keyboard matrix...",
    "Syncing with typing servers...",
    "Preparing funky experience...",
    "Ready to type!",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2

        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1))

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowMatrix(false)
            setTimeout(onComplete, 500)
          }, 1000)
          return 100
        }

        return newProgress
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete, loadingSteps.length])

  // Matrix rain effect
  const MatrixRain = () => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary-500 font-mono text-sm opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="matrix-rain">
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="block">
                  {chars[Math.floor(Math.random() * chars.length)]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-bg-900 via-bg-800 to-bg-900 flex items-center justify-center transition-opacity duration-500 ${showMatrix ? "opacity-100" : "opacity-0"}`}
    >
      <MatrixRain />

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-30"
          style={{
            animation: "scan 2s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Logo with glitch effect */}
        <div className="mb-12">
          <div className="text-4xl font-bold font-mono mb-4">
            <span className="text-primary-500 animate-pulse">{"{"}</span>
            <span className="text-accent-400 relative inline-block">
              funky
              <span className="absolute -top-1 -right-1 text-lg text-primary-300 animate-pulse">_</span>
            </span>
            <span className="text-secondary-400">type</span>
            <span className="text-primary-500 animate-pulse">{"}"}</span>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-primary-500 via-accent-400 to-secondary-400 opacity-60 animate-pulse"></div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full h-2 bg-surface-800 rounded-full overflow-hidden border border-surface-600">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="mt-2 text-right text-sm text-text-400 font-mono">{progress.toFixed(0)}%</div>
        </div>

        {/* Loading steps */}
        <div className="space-y-2">
          {loadingSteps.map((step, index) => (
            <div
              key={index}
              className={`text-sm transition-all duration-300 ${
                index === currentStep
                  ? "text-primary-400 opacity-100 scale-105"
                  : index < currentStep
                    ? "text-text-500 opacity-60"
                    : "text-text-600 opacity-30"
              }`}
            >
              <span className="font-mono">
                {index === currentStep && "> "}
                {step}
                {index === currentStep && <span className="animate-pulse ml-1">|</span>}
              </span>
            </div>
          ))}
        </div>

        {/* Tech details */}
        <div className="mt-8 text-xs text-text-500 font-mono space-y-1">
          <div>Neural Network: ACTIVE</div>
          <div>Typing Engine: v2.1.0</div>
          <div>Matrix Protocol: ENABLED</div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-primary-500 font-mono text-xs opacity-60">[INIT]</div>
      <div className="absolute top-4 right-4 text-accent-500 font-mono text-xs opacity-60">[LOAD]</div>
      <div className="absolute bottom-4 left-4 text-secondary-500 font-mono text-xs opacity-60">[SYS]</div>
      <div className="absolute bottom-4 right-4 text-primary-500 font-mono text-xs opacity-60">[RDY]</div>
    </div>
  )
}

export default LoadingScreen
