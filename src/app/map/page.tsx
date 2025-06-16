"use client"
import LiveEmotionMap from '@/components/map/LiveEmotionMap';
import EmotionMatch from '@/components/ai/EmotionMatch'; 
import { EmotionType } from '@/types/emotion';
import { useState } from 'react';

// بيانات تجريبية للخريطة
const mockEmotions = [
    {
        id: '1',
        location: [24.7136, 46.6753] as [number, number],
        emotion: 'joy' as EmotionType,
        message: 'أشعر بسعادة كبيرة اليوم لأنني أنهيت مشروعي النهائي!',
        timestamp: new Date()
    },
    {
        id: '2',
        location: [25.2048, 55.2708] as [number, number],
        emotion: 'gratitude' as EmotionType,
        message: 'أشعر بالامتنان لوجود أصدقائي بجانبي في الأوقات الصعبة',
        timestamp: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
        id: '3',
        location: [40.7128, -74.0060] as [number, number],
        emotion: 'excitement' as EmotionType,
        message: 'سأبدأ وظيفة جديدة الأسبوع القادم!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
        id: '4',
        location: [35.6895, 139.6917] as [number, number],
        emotion: 'peace' as EmotionType,
        message: 'اليوم قضيت وقتًا في التأمل وكان رائعًا',
        timestamp: new Date(Date.now() - 1000 * 60 * 45)
    },
    {
        id: '5',
        location: [51.5074, -0.1278] as [number, number],
        emotion: 'loneliness' as EmotionType,
        message: 'أشعر بالوحدة في هذه المدينة الكبيرة',
        timestamp: new Date(Date.now() - 1000 * 60 * 60)
    },
];

// تعريف إعدادات المشاعر للاستخدام في هذه الصفحة
const emotionConfig: Record<EmotionType, { color: string; icon: string }> = {
    joy: { color: 'bg-yellow-400', icon: '😊' },
    sadness: { color: 'bg-blue-400', icon: '😢' },
    gratitude: { color: 'bg-green-400', icon: '🙏' },
    excitement: { color: 'bg-orange-400', icon: '🎉' },
    peace: { color: 'bg-purple-400', icon: '☮️' },
    love: { color: 'bg-pink-400', icon: '❤️' },
    anxiety: { color: 'bg-red-400', icon: '😰' },
    loneliness: { color: 'bg-gray-400', icon: '👤' },
};

export default function MapPage() {
    const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('joy');

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-purple-800 mb-6">خريطة المشاعر الحية</h1>
            <p className="text-gray-600 mb-8">
                شاهد نبضات المشاعر حول العالم في الوقت الفعلي. كل نقطة تمثل شخصًا يشارك شعوره الآن.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-xl p-4 mb-8">
                        <LiveEmotionMap emotions={mockEmotions} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {Object.entries({
                            joy: 'فرح',
                            sadness: 'حزن',
                            gratitude: 'امتنان',
                            excitement: 'حماس',
                            peace: 'سلام',
                            love: 'حب',
                            anxiety: 'قلق',
                            loneliness: 'وحدة',
                        }).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${emotionConfig[key as EmotionType].color}`}>
                                    {emotionConfig[key as EmotionType].icon}
                                </div>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <h2 className="text-xl font-semibold text-purple-800 mb-4">
                            اقتراحات عاطفية
                        </h2>
                        <p className="text-gray-600 mb-4">
                            اكتشف أشخاصًا يشعرون بمشاعر مشابهة
                        </p>

                        <EmotionMatch emotion={selectedEmotion} />

                        <div className="mt-6 bg-purple-50 rounded-xl p-4">
                            <h3 className="font-semibold text-purple-700 mb-2">
                                تصفية الاقتراحات حسب المشاعر
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries({
                                    joy: 'فرح',
                                    sadness: 'حزن',
                                    gratitude: 'امتنان',
                                    excitement: 'حماس',
                                    peace: 'سلام',
                                    love: 'حب',
                                    anxiety: 'قلق',
                                    loneliness: 'وحدة',
                                }).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedEmotion(key as EmotionType)}
                                        className={`px-3 py-1 rounded-full text-sm ${selectedEmotion === key
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white text-purple-600 border border-purple-200'
                                            }`}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-purple-800 mb-4">كيف تعمل الخريطة؟</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>كل نقطة تمثل شخصًا شارك شعوره في آخر 24 ساعة</li>
                    <li>الألوان تمثل نوع المشاعر المختلفة</li>
                    <li>انقر على أي نقطة لقراءة رسالة الشخص</li>
                    <li>النقاط تنبض لتمثل أن المشاعر حية ومباشرة</li>
                </ul>
            </div>
        </div>
    );
}