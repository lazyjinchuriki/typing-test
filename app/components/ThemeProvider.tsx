"use client"
import type React from "react"
import { useContext, useEffect } from "react"
import { AppContext } from "../context/appContext"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useContext(AppContext)

  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove("theme-matrix", "theme-sage", "theme-mocha", "theme-cyber", "theme-coral")

    // Add current theme class
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme])

  return <>{children}</>
}
