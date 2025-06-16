'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex justify-center gap-2 md:gap-4">
            <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold bg-purple-600 text-white rounded-lg p-2 md:p-4 min-w-[50px]">
                    {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm mt-1">أيام</div>
            </div>

            <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold bg-purple-600 text-white rounded-lg p-2 md:p-4 min-w-[50px]">
                    {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm mt-1">ساعات</div>
            </div>

            <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold bg-purple-600 text-white rounded-lg p-2 md:p-4 min-w-[50px]">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm mt-1">دقائق</div>
            </div>

            <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold bg-purple-600 text-white rounded-lg p-2 md:p-4 min-w-[50px]">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm mt-1">ثواني</div>
            </div>
        </div>
    );
}