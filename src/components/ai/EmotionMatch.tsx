'use client';

import { useState, useEffect } from 'react';
import { EmotionType, emotionToEmoji } from '@/lib/ai/matchingAlgorithm';
import { motion } from 'framer-motion';

interface Match {
    id: string;
    name: string;
    location: string;
    similarity: number;
    emotion: EmotionType;
}

export default function EmotionMatch({ emotion }: { emotion: EmotionType }) {
    const [match, setMatch] = useState<Match | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // محاكاة جلب بيانات التطابق من الخادم
        const fetchMatch = async () => {
            setIsLoading(true);

            // بيانات تجريبية
            const mockMatches: Record<EmotionType, Match> = {
                joy: {
                    id: '1',
                    name: 'أحمد',
                    location: 'الرياض',
                    similarity: 92,
                    emotion: 'joy'
                },
                sadness: {
                    id: '2',
                    name: 'فاطمة',
                    location: 'جدة',
                    similarity: 87,
                    emotion: 'sadness'
                },
                gratitude: {
                    id: '3',
                    name: 'خالد',
                    location: 'دبي',
                    similarity: 95,
                    emotion: 'gratitude'
                },
                excitement: {
                    id: '4',
                    name: 'نورة',
                    location: 'القاهرة',
                    similarity: 89,
                    emotion: 'excitement'
                },
                peace: {
                    id: '5',
                    name: 'عمر',
                    location: 'الدوحة',
                    similarity: 91,
                    emotion: 'peace'
                },
                love: {
                    id: '6',
                    name: 'ليلى',
                    location: 'بيروت',
                    similarity: 94,
                    emotion: 'love'
                },
                anxiety: {
                    id: '7',
                    name: 'سارة',
                    location: 'عمّان',
                    similarity: 85,
                    emotion: 'anxiety'
                },
                loneliness: {
                    id: '8',
                    name: 'يوسف',
                    location: 'الخرطوم',
                    similarity: 90,
                    emotion: 'loneliness'
                },
            };

            // محاكاة التأخير الشبكي
            await new Promise(resolve => setTimeout(resolve, 1500));

            setMatch(mockMatches[emotion]);
            setIsLoading(false);
        };

        fetchMatch();
    }, [emotion]);

    if (isLoading) {
        return (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">جاري البحث عن شخص يشعر مثلك...</p>
            </div>
        );
    }

    if (!match) {
        return (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-gray-600">لم نجد من يشعر مثلك الآن. حاول لاحقًا!</p>
            </div>
        );
    }

    return (
        <motion.div
            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="font-bold text-lg text-purple-800 mb-4">لدينا اقتراح لك!</h3>

            <div className="flex items-center justify-center mb-4">
                <div className="relative">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <span className="absolute -top-2 -right-2 text-2xl">
                        {emotionToEmoji(match.emotion)}
                    </span>
                </div>
            </div>

            <div className="text-center mb-6">
                <p className="font-medium text-lg">{match.name}</p>
                <p className="text-gray-600 text-sm">من {match.location}</p>
            </div>

            <div className="mb-6">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">التوافق العاطفي</span>
                    <span className="text-sm font-bold text-purple-600">{match.similarity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: `${match.similarity}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full font-medium transition-colors">
                    ارسل رسالة دعم
                </button>
                <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 px-4 rounded-full font-medium transition-colors">
                    تجاهل الاقتراح
                </button>
            </div>
        </motion.div>
    );
}