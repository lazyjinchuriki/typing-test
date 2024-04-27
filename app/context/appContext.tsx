"use client"
import React, { createContext, useMemo, useState } from "react";
export const AppContext = createContext({
    wpm: 0,
    setWpm: (wpm: number) => { },
    cpm: 0,
    setCpm: (cpm: number) => { },
    accuracy: 100,
    setAccuracy: (accuracy: number) => { },
});

interface AppProviderProps {
    children: React.ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [wpm, setWpm] = useState<number>(0);
    const [cpm, setCpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(100);
    const value = useMemo(
        () => ({
            wpm, setWpm,
            cpm, setCpm,
            accuracy, setAccuracy
        }),
        [
            wpm,
            cpm,
            accuracy
        ]
    );
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};