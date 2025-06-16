'use client'
import { motion } from 'framer-motion';
import { EmotionType } from '@/types/emotion';

import { useRouter } from 'next/navigation';

const events = [
    {
        id: '1',
        title: 'ساعة الامتنان',
        emotion: 'gratitude' as EmotionType,
        description: 'انضم إلى آلاف الأشخاص حول العالم في مشاركة مشاعر الامتنان لمدة ساعة كاملة',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // غدًا في نفس الوقت
        duration: 60,
        participants: 1428,
    },
    {
        id: '2',
        title: 'موجة الفرح',
        emotion: 'joy' as EmotionType,
        description: 'شارك الفرح مع العالم! حدث خاص لمشاركة اللحظات السعيدة',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 48), // بعد يومين
        duration: 30,
        participants: 892,
    },
    {
        id: '3',
        title: 'دقيقة السلام',
        emotion: 'peace' as EmotionType,
        description: 'دقيقة واحدة من التأمل والسلام الداخلي مع العالم',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 72), // بعد ثلاثة أيام
        duration: 15,
        participants: 567,
    },
];

const emotionColors: Record<EmotionType, string> = {
    joy: 'bg-yellow-400',
    sadness: 'bg-blue-400',
    gratitude: 'bg-green-400',
    excitement: 'bg-orange-400',
    peace: 'bg-purple-400',
    love: 'bg-pink-400',
    anxiety: 'bg-red-400',
    loneliness: 'bg-gray-400',
};

const emotionIcons: Record<EmotionType, string> = {
    joy: '😊',
    sadness: '😢',
    gratitude: '🙏',
    excitement: '🎉',
    peace: '☮️',
    love: '❤️',
    anxiety: '😰',
    loneliness: '👤',
};

export default function EventsPage() {
    const router = useRouter(); // استخدم useRouter من next/navigation
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-purple-800 mb-6">الأحداث الجماعية</h1>
            <p className="text-gray-600 mb-8">
                انضم إلى موجات المشاعر الجماعية حيث يشارك الآلاف نفس الشعور في نفس اللحظة
            </p>

            <div className="space-y-6">
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`p-6 ${emotionColors[event.emotion]} bg-opacity-20`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-2xl ${emotionColors[event.emotion]} rounded-full w-10 h-10 flex items-center justify-center`}>
                                            {emotionIcons[event.emotion]}
                                        </span>
                                        <h2 className="text-2xl font-bold">{event.title}</h2>
                                    </div>
                                    <p className="text-gray-700">{event.description}</p>
                                </div>
                                <div className="text-center bg-white rounded-full px-4 py-2 shadow">
                                    <span className="block text-sm text-gray-500">المشاركون</span>
                                    <span className="block font-bold text-lg">{event.participants.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <div className="text-gray-500">الوقت المتبقي</div>
                                    <div className="font-bold text-lg">
                                        {Math.floor((event.startTime.getTime() - Date.now()) / (1000 * 60 * 60))} ساعة
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500">المدة</div>
                                    <div className="font-bold text-lg">{event.duration} دقيقة</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">البداية</div>
                                    <div className="font-bold text-lg">
                                        {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => router.push(`/events/${event.id}`)} 
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-bold text-lg transition-colors">
                                انضم إلى الحدث
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}