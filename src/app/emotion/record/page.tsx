'use client';
import { transcribeAudio, analyzeSentiment, generateInsight } from '@/lib/ai/emotionAnalysis';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EmotionSelector from '@/components/emotion/EmotionSelector';
import AudioRecorder from '@/components/recording/AudioRecorder';
import { toast } from 'react-hot-toast';
import EmotionMatch from '@/components/ai/EmotionMatch';
import { EmotionType } from '@/types/emotion';

export default function RecordEmotionPage() {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [showMatch, setShowMatch] = useState(false);
    const [analysisResults, setAnalysisResults] = useState<{
        transcript: string;
        sentiment: string;
        insight: string;
    } | null>(null);

    const handleSubmit = async () => {
        if (!selectedEmotion) {
            toast.error('الرجاء اختيار شعورك');
            return;
        }

        if (!audioBlob) {
            toast.error('الرجاء تسجيل رسالتك الصوتية');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. تحويل الصوت إلى نص
            const transcript = await transcribeAudio(audioBlob);
            
            // 2. تحليل المشاعر من النص
            const sentiment = analyzeSentiment(transcript);
            
            // 3. توليد نصائح
            const insight = generateInsight(selectedEmotion, sentiment.score);
            
            // 4. حفظ النتائج
            setAnalysisResults({
                transcript,
                sentiment: sentiment.emotion,
                insight
            });
            
            toast.success('تم تسجيل شعورك بنجاح!');
            setShowMatch(true);
        } catch (error) {
            toast.error('حدث خطأ أثناء تحليل مشاعرك');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">شارك شعورك مع العالم</h1>
            
            {!showMatch ? (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">كيف تشعر الآن؟</h2>
                    <EmotionSelector onSelect={setSelectedEmotion} />

                    <h2 className="text-xl font-semibold mt-8 mb-4">سجل رسالتك</h2>
                    <p className="text-gray-600 mb-4">
                        شارك لماذا تشعر بهذا الشعور في رسالة صوتية قصيرة (30 ثانية)
                    </p>
                    <AudioRecorder onRecordingComplete={setAudioBlob} />

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !selectedEmotion || !audioBlob}
                            className={`px-8 py-3 rounded-full font-bold text-white ${
                                isSubmitting || !selectedEmotion || !audioBlob
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700'
                            } transition-colors`}
                        >
                            {isSubmitting ? 'جاري الإرسال...' : 'شارك شعورك'}
                        </button>
                    </div>
                </div>
            ) : analysisResults ? (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
                        تحليل مشاعرك
                    </h2>
                    
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-2">ما قلته:</h3>
                        <p className="bg-gray-50 p-4 rounded-lg">{analysisResults.transcript}</p>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-2">تحليل المشاعر:</h3>
                        <div className={`p-4 rounded-lg ${
                            analysisResults.sentiment === 'positive' 
                                ? 'bg-green-100 text-green-800' 
                                : analysisResults.sentiment === 'negative'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {analysisResults.sentiment === 'positive' && 'إيجابية 😊'}
                            {analysisResults.sentiment === 'negative' && 'سلبية 😔'}
                            {analysisResults.sentiment === 'neutral' && 'محايدة 😐'}
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-2">نصيحة لك:</h3>
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <p>{analysisResults.insight}</p>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
                        اقتراح تواصل
                    </h2>
                    
                    <div className="text-center mb-8">
                        <p className="text-gray-600 mb-4">
                            وجدنا شخصًا يشعر بنفس شعورك الآن:
                        </p>
                        <EmotionMatch emotion={selectedEmotion as EmotionType} />
                    </div>
                    
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => {
                                setShowMatch(false);
                                setAnalysisResults(null);
                            }}
                            className="border border-purple-600 text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                        >
                            مشاركة شعور جديد
                        </button>
                        <button
                            onClick={() => router.push('/map')}
                            className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                        >
                            استكشف الخريطة
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
                        شكرًا لمشاركتك مشاعرك!
                    </h2>
                    <div className="text-center mb-8">
                        <p className="text-gray-600 mb-4">
                            وجدنا شخصًا يشعر بنفس شعورك الآن. يمكنك التواصل معه لتبادل الدعم:
                        </p>
                        <EmotionMatch emotion={selectedEmotion as EmotionType} />
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setShowMatch(false)}
                            className="border border-purple-600 text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                        >
                            مشاركة شعور جديد
                        </button>
                        <button
                            onClick={() => router.push('/map')}
                            className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                        >
                            استكشف الخريطة
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}