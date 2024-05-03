"use client"
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/appContext'
import CircularProgress from './circularProgress'

const Stats = () => {
    const { timer, wpm, cpm, accuracy } = useContext(AppContext)
    return (
        <div className='p-14 flex justify-center gap-4'>

            <CircularProgress value={timer} size={120} strokeWidth={5} >
                <h1 className=' text-4xl font-bold text-center text-[rgb(27,27,32)]'>{timer}</h1>
                <h6 className='text-sm text-center font-light text-[rgb(27,27,32)]'>seconds</h6>
            </CircularProgress>
            <div className='w-28 flex flex-col justify-center bg-white rounded-full'>
                <h1 className='text-4xl font-bold text-center text-[rgb(27,27,32)]'>{wpm}</h1>
                <h6 className='text-sm text-center font-light text-[rgb(27,27,32)]'>words/min</h6>
            </div>
            <div className='w-28 flex flex-col justify-center bg-white rounded-full'>
                <h1 className='text-4xl font-bold text-center text-[rgb(27,27,32)]'>{cpm}</h1>
                <h6 className='text-sm text-center font-light text-[rgb(27,27,32)]'>chars/min</h6>
            </div>
            <div className='w-28 flex flex-col justify-center bg-white rounded-full'>
                <h1 className='text-4xl font-bold text-center text-[rgb(27,27,32)]'>{accuracy}</h1>
                <h6 className='text-sm text-center font-light text-[rgb(27,27,32)]'>% accuracy</h6>
            </div>

        </div>
    )
}

export default Stats
