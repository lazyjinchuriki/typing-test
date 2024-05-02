import React, { ReactNode } from 'react';

interface CircularProgressProps {
    value: number;
    size: number;
    strokeWidth: number;
    children?: ReactNode;
}

const CircularProgress = ({ value, size, strokeWidth, children }: CircularProgressProps) => {
    const totalValue = 60;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = circumference - (value / totalValue) * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{
                transform: 'rotate(-90deg)',
                position: 'absolute'
            }}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#ddd"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgb(255,208,0)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                />
            </svg>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}>
                {children}
            </div>
        </div>
    );
};

export default CircularProgress;