"use client"
import React, { useState, useEffect, useRef } from 'react';

const paragraph = "Everything that you thought had meaning: every hope, dream, or moment of happiness. None of it matters as you lie bleeding out on the battlefield. None of it changes what a speeding rock does to a body, we all die.But does that mean our lives are meaningless?... Does that mean that there was no point in our being born?... Would you say that of our slain comrades?... What about their lives?... Were they meaningless?..They were not! Their memory serves as an example to us all! The courageous fallen! The anguished fallen! Their lives have meaning because we the living refuse to forget them!And as we ride to certain death, we trust our successors to do the same for us! Because my soldiers do not buckle or yield when faced with the cruelty of this world! My soldiers push forward! My soldiers scream out! My soldiers RAAAAAGE!";


const unsupportedKeys = ["Shift", "CapsLock", "Control", "Alt", "Tab", "Escape", "Meta", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", "Insert", "Delete", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "ScrollLock", "Pause"]
const TypingTest = () => {
    const cursorRef = useRef<HTMLSpanElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<{ wordIndex: number, letterIndex: number, completedWords: string[], typedWords: string[] }>({ wordIndex: 0, letterIndex: 0, completedWords: [], typedWords: [] });

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        cursorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };

    }, [state]);


    const handleKeyPress = (e: KeyboardEvent) => {
        const words = paragraph.split("");
        const currentWord = words[state.wordIndex];
        const currentLetter = currentWord.split("")[state.letterIndex];

        let newTypedWords = [...state.typedWords];

        if (unsupportedKeys.includes(e.key)) return;

        if (e.key === 'Backspace') {
            if (newTypedWords[state.wordIndex - 1]) {
                newTypedWords[state.wordIndex - 1] = newTypedWords[state.wordIndex - 1].slice(0, -1);
            }
            else if (state.wordIndex > 0) {
                newTypedWords[state.wordIndex - 1] = '';
            }
        }
        else {
            if (newTypedWords[state.wordIndex]) {
                newTypedWords[state.wordIndex] += e.key;
            } else {
                newTypedWords[state.wordIndex] = e.key;
            }
        }

        let newWordIndex = state.wordIndex;
        let newLetterIndex = state.letterIndex;
        if (e.key !== 'Backspace') {
            newLetterIndex++;
        } else if (newLetterIndex > 0) {
            newLetterIndex--;
        } else if (newWordIndex > 0) {
            newWordIndex--;
            newLetterIndex = words[newWordIndex].length - 1;
        }

        let newCompletedWords = [...state.completedWords];

        if (newLetterIndex === currentWord.length) {
            newWordIndex++;
            newLetterIndex = 0;
            newCompletedWords.push(currentWord);
        }

        setState({ wordIndex: newWordIndex, letterIndex: newLetterIndex, completedWords: newCompletedWords, typedWords: newTypedWords });
    };
    return (
        <div className="flex justify-center h-screen items-center bg-[rgb(246,246,247)]">
            <div className='w-screen px-12'>
                <div
                    onClick={(e) => {

                    }}
                    ref={scrollRef} className='shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,0,0,0.1)] rounded-lg  h-36 overflow-x-auto scrollbar-hidden flex items-center justify-center'>
                    <div className='inline-flex items-center justify-center transform translate-x-1/2'>
                        {paragraph.split("").map((word, wordIndex) => {
                            return (
                                <>
                                    <span key={wordIndex}  >
                                        {word.split("").map((letter, letterIndex) => {
                                            return (
                                                <>

                                                    <span key={letterIndex} className={` text-3xl p-0 m-0 font-light ${wordIndex === state.wordIndex && letterIndex === state.letterIndex ? "text-[rgb(0,102,255)]" : wordIndex < state.wordIndex ? (word === state.typedWords[wordIndex] ? "text-green-500" : "text-red-500") : "text-black"}`}>
                                                        {wordIndex === state.wordIndex && letterIndex === state.letterIndex &&

                                                            <span
                                                                ref={cursorRef}
                                                                className="m-[0px] animate-cursor  border-r-2 border-black" />

                                                        }
                                                        {letter}

                                                    </span>
                                                </>
                                            );
                                        })}
                                    </span>
                                    {word === " " && <span className='m-2'></span>}
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingTest;