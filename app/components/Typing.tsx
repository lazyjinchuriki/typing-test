"use client"
import React, { useState, useEffect, useRef, useContext } from 'react';
import { paragraph } from '../utils/paragraph';
import { unsupportedKeys } from '../utils/unsupportedkeys';
import { AppContext } from '../context/appContext';

const TypingTest = () => {
    const { setWpm, setCpm, setAccuracy } = useContext(AppContext);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const [state, setState] = useState
        <{
            letterIndex: number,
            wordsMap: Map<number, {
                typedLetter: string,
                supposedToBe: string

            }>
        }>({
            letterIndex: 0,
            wordsMap: new Map<number, {
                typedLetter: string,
                supposedToBe: string
            }>()
        });
    console.log(state.wordsMap)
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        cursorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };

    }, [state]);


    const handleKeyPress = (e: KeyboardEvent) => {
        if (unsupportedKeys.includes(e.key)) return;
        const letters = paragraph.split("");
        // we need to implement backspace logic also we need to git what was typed and what was expectyed and based on that show those characters in red and if correct show them as gray
        if (e.key !== 'Backspace') {
            setState((prev) => ({
                ...prev, letterIndex: prev.letterIndex + 1,
                wordsMap: prev.wordsMap.set(prev.letterIndex, {
                    typedLetter: e.key,
                    supposedToBe: letters[prev.letterIndex]
                })
            }));
        } else if (e.key === "Backspace" && state.letterIndex > 0) {
            setState((prev) => ({
                ...prev, letterIndex: prev.letterIndex - 1,
                wordsMap: prev.wordsMap.set(prev.letterIndex, {
                    typedLetter: "",
                    supposedToBe: letters[prev.letterIndex]
                })
            }));
        }

        //calculating wpm, cpm and accuracy



    };
    return (

        <div
            className='shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,0,0,0.1)] rounded-lg  h-36 overflow-x-auto scrollbar-hidden flex items-center justify-center'>
            <div className='inline-flex items-center justify-center transform translate-x-1/2'>
                {paragraph.split("").map((letter, letterIndex) => {
                    return (
                        <span key={`${letter.concat((letterIndex).toString())}`}>

                            <span className={`text-3xl p-0 m-0 font-light
                            ${letterIndex === state.letterIndex && "text-blue-500"}
                            ${letterIndex > state.letterIndex && "text-black"}
                            ${letterIndex < state.letterIndex &&
                                    state.wordsMap.get(letterIndex)?.typedLetter === state.wordsMap.get(letterIndex)?.supposedToBe ? "text-gray-500" : "text-red-500"
                                }
                             
                            
                            
                            `}
                            >
                                {letterIndex === state.letterIndex && <span
                                    ref={cursorRef}
                                    className="m-[0px] animate-cursor  border-r-2 border-black"
                                />}
                                {letter === " " ? "\u00A0" : letter}
                            </span>
                        </span>
                    );
                })}
            </div>
        </div >

    );
};

export default TypingTest;