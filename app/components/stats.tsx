"use client"
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/appContext'
import CircularProgress from './circularProgress'

const Stats = () => {
    const { timer, wpm, cpm, accuracy } = useContext(AppContext)
    return (
        <div className='p-14 flex justify-center gap-4'>

            <CircularProgress value={timer} size={120} strokeWidth={5} >
                <h1 className=' text-4xl font-bold text-center'>{timer}</h1>
                <h6 className='text-sm text-center font-light'>seconds</h6>
            </CircularProgress>
            <div className='w-28 flex flex-col justify-center bg-white rounded-full'>
                <h1 className='text-4xl font-bold text-center'>{wpm}</h1>
                <h6 className='text-sm text-center font-light'>words/min</h6>
            </div>
            <div className='w-28 flex flex-col justify-center bg-white rounded-full'>
                <h1 className='text-4xl font-bold text-center'>{cpm}</h1>
                <h6 className='text-sm text-center font-light'>chars/min</h6>
            </div>
            <div className='w-28 flex flex-col justify-center bg-white rounded-full'>
                <h1 className='text-4xl font-bold text-center'>{accuracy}</h1>
                <h6 className='text-sm text-center font-light'>% accuracy</h6>
            </div>

        </div>
    )
}

export default Stats
