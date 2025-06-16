'use client';

import { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaTrash } from 'react-icons/fa';

export default function AudioRecorder({ onRecordingComplete }: { onRecordingComplete: (audioBlob: Blob) => void }) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            onRecordingComplete(audioBlob);
            audioChunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const deleteRecording = () => {
        setAudioUrl(null);
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
    };

    return (
        <div className="mt-8">
            <div className="flex justify-center">
                {!audioUrl ? (
                    <button
                        className={`p-6 rounded-full ${isRecording
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-purple-600 hover:bg-purple-700'
                            } text-white transition-colors duration-300`}
                        onClick={isRecording ? stopRecording : startRecording}
                    >
                        {isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <audio src={audioUrl} controls className="w-full" />
                        <button
                            onClick={deleteRecording}
                            className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        >
                            <FaTrash />
                        </button>
                    </div>
                )}
            </div>
            <p className="text-center mt-4 text-gray-600">
                {isRecording
                    ? 'جاري التسجيل... (اضغط للتوقف)'
                    : audioUrl
                        ? 'يمكنك الاستماع للتسجيل أو حذفه'
                        : 'اضغط لبدء تسجيل مشاعرك (30 ثانية كحد أقصى)'
                }
            </p>
        </div>
    );
}