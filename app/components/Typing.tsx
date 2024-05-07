"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { generateRandomParagraph } from "../utils/paragraph";
import { unsupportedKeys } from "../utils/unsupportedkeys";
import { AppContext } from "../context/appContext";
import { Merriweather } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});
const TypingTest = () => {
  const { setWpm, setCpm, setAccuracy, setTimer, timer, wpm, cpm, accuracy } =
    useContext(AppContext);
  const [startedTyping, setStartedTyping] = useState<boolean>(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [paragraph, setParagraph] = useState<string>("");
  const [state, setState] = useState<{
    letterIndex: number;
    wordsMap: Map<
      number,
      {
        typedLetter: string;
        supposedToBe: string;
      }
    >;
  }>({
    letterIndex: 0,
    wordsMap: new Map<
      number,
      {
        typedLetter: string;
        supposedToBe: string;
      }
    >(),
  });
  useEffect(() => {
    const { paragraph } = generateRandomParagraph();
    setParagraph(paragraph);
  }, []);
  //console.log(state.wordsMap)
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if (timer <= 0) {
      setOpenDialog(true);
      setStartedTyping(false);
    } else {
      window.addEventListener("keydown", handleKeyPress);
      cursorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [state, timer]);

  useEffect(() => {
    if (startedTyping) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startedTyping]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (unsupportedKeys.includes(e.key)) return;
    const letters = paragraph.split("");
    // we need to implement backspace logic also we need to get what was typed and what was expected and based on that show those characters in red and if correct show them as gray
    if (!startedTyping) {
      setStartedTyping(true);
    }

    //calculating wpm, cpm and accuracy
    let typedLetters = Array.from(state.wordsMap.values()).map(
      (letter) => letter.typedLetter
    );
    let typedWords = typedLetters
      .join("")
      .split(" ")
      .filter((word) => word !== "");
    let supposedToBeLetter = Array.from(state.wordsMap.values()).map(
      (letter) => letter.supposedToBe
    );
    let supposedToBeWords = supposedToBeLetter
      .join("")
      .split(" ")
      .filter((word) => word !== "");
    let correctWords = supposedToBeWords.filter(
      (word, index) => word === typedWords[index]
    );

    let accuracy =
      supposedToBeWords.length > 0
        ? Math.floor((correctWords.length / supposedToBeWords.length) * 100)
        : 0;

    console.log(typedWords, supposedToBeWords, correctWords);
    if (e.key === " ") {
      setWpm(Math.floor(correctWords.length));
      setCpm(Math.floor(correctWords.join("").length));
      setAccuracy(accuracy);
    }
    if (e.key !== "Backspace") {
      setState((prev) => ({
        ...prev,
        letterIndex: prev.letterIndex + 1,
        wordsMap: prev.wordsMap.set(prev.letterIndex, {
          typedLetter: e.key,
          supposedToBe: letters[prev.letterIndex],
        }),
      }));
    } else if (e.key === "Backspace" && state.letterIndex > 0) {
      setState((prev) => ({
        ...prev,
        letterIndex: prev.letterIndex - 1,
        wordsMap: prev.wordsMap.set(prev.letterIndex, {
          typedLetter: "",
          supposedToBe: letters[prev.letterIndex],
        }),
      }));
    }
  };
  return (
    <>
      <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,0,0,0.1)] rounded-lg  h-36 overflow-x-auto scrollbar-hidden flex items-center justify-center">
        <div className="inline-flex items-center justify-center transform translate-x-1/2">
          {paragraph.split("").map((letter, letterIndex) => {
            return (
              <span key={`${letter.concat(letterIndex.toString())}`}>
                <span
                  className={`text-3xl p-0 m-0 font-thin ${
                    merriweather.className
                  }
                            ${
                              letterIndex === state.letterIndex
                                ? "text-blue-500"
                                : letterIndex > state.letterIndex
                                ? "text-[rgb(27,27,32)]"
                                : letterIndex < state.letterIndex &&
                                  state.wordsMap.get(letterIndex)
                                    ?.typedLetter ===
                                    state.wordsMap.get(letterIndex)
                                      ?.supposedToBe
                                ? "text-[rgb(202,202,205)]"
                                : "text-red-500"
                            }
                            `}
                >
                  {letterIndex === state.letterIndex && (
                    <span
                      ref={cursorRef}
                      className="m-[0px] animate-cursor  border-r-2 border-[rgb(27,27,32)]"
                    />
                  )}
                  {letter === " " ? "\u00A0" : letter}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <Dialog
        open={openDialog}
        onOpenChange={() => {
          setState({
            letterIndex: 0,
            wordsMap: new Map<
              number,
              {
                typedLetter: string;
                supposedToBe: string;
              }
            >(),
          });
          setOpenDialog(false);
          setTimer(60);
          setWpm(0);
          setCpm(0);
          setAccuracy(0);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Your time is up.</DialogTitle>
            <DialogDescription>
              Well...Your typing speed is{" "}
              <b className="text-black">{wpm} words per minute</b> and{" "}
              <b className="text-black">{cpm} characters per minute</b> with an
              accuracy of <b className="text-black">{accuracy}%</b>. Keep
              practicing!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TypingTest;
