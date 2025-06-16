'use client'
import { EmotionType } from '@/types/emotion';
import CountdownTimer from '@/components/events/CountdownTimer';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation'; // أضف هذا الاستيراد


interface EventDetailPageProps {
    params: {
        id: string;
    };
}
  
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

export default function EventDetailPage() {

    const params = useParams();
    const eventId = params.id as string;
    console.log(params.id);
    // في الواقع، سنجلب بيانات الحدث من قاعدة البيانات باستخدام الـ id
    const event = {
        id: '1',
        title: 'ساعة الامتنان',
        emotion: 'gratitude' as EmotionType,
        description: 'انضم إلى آلاف الأشخاص حول العالم في مشاركة مشاعر الامتنان لمدة ساعة كاملة. هذا الحدث سيكون فرصة رائعة للتركيز على الجوانب الإيجابية في حياتنا ومشاركتها مع الآخرين.',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // غدًا في نفس الوقت
        duration: 60,
        participants: 1428,
        rules: [
            'شارك شعور الامتنان في أي وقت خلال الساعة',
            'يمكنك المشاركة بأكثر من مرة',
            'حاول أن تكون أصليًا وتشارك مشاعرك الحقيقية',
            'احترم مشاعر الآخرين وتعليقاتهم'
        ]
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-purple-800 mb-4">{event.title}</h1>
                <div className="flex justify-center">
                    <div className={`text-4xl rounded-full w-20 h-20 flex items-center justify-center ${emotionColors[event.emotion]} bg-opacity-20`}>
                        {emotionIcons[event.emotion]}
                    </div>
                </div>
            </div>

            <motion.div
                className="bg-white rounded-2xl shadow-xl p-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold mb-4">عن الحدث</h2>
                <p className="text-gray-700 mb-6">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-purple-50 p-4 rounded-xl">
                        <div className="text-gray-500">الوقت المتبقي</div>
                        <CountdownTimer targetDate={event.startTime} />
                        <div className="font-bold text-xl">
                            {Math.floor((event.startTime.getTime() - Date.now()) / (1000 * 60 * 60))} ساعة
                        </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                        <div className="text-gray-500">المدة</div>
                        <div className="font-bold text-xl">{event.duration} دقيقة</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                        <div className="text-gray-500">المشاركون</div>
                        <div className="font-bold text-xl">{event.participants.toLocaleString()}</div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">كيف تشارك؟</h3>
                <ul className="list-disc list-inside space-y-2 mb-8">
                    {event.rules.map((rule, index) => (
                        <li key={index} className="text-gray-700">{rule}</li>
                    ))}
                </ul>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-bold text-xl transition-colors">
                    انضم إلى الحدث الآن
                </button>
            </motion.div>

            <div className="bg-purple-50 rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4">المشاركون الآن</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 18 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 text-center shadow">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-2" />
                            <div className="font-medium">مشارك {index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}