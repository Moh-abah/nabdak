import { useState } from 'react';

const emotions = [
    { id: 'joy', name: 'فرح', icon: '😊', color: 'bg-yellow-100 border-yellow-400' },
    { id: 'sadness', name: 'حزن', icon: '😢', color: 'bg-blue-100 border-blue-400' },
    { id: 'gratitude', name: 'امتنان', icon: '🙏', color: 'bg-green-100 border-green-400' },
    { id: 'excitement', name: 'حماس', icon: '🎉', color: 'bg-orange-100 border-orange-400' },
    { id: 'peace', name: 'سلام', icon: '☮️', color: 'bg-purple-100 border-purple-400' },
    { id: 'love', name: 'حب', icon: '❤️', color: 'bg-pink-100 border-pink-400' },
];

export default function EmotionSelector({ onSelect }: { onSelect: (emotionId: string) => void }) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            {emotions.map((emotion) => (
                <button
                    key={emotion.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center
            ${selected === emotion.id
                            ? `${emotion.color} border-2 scale-105`
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                    onClick={() => {
                        setSelected(emotion.id);
                        onSelect(emotion.id);
                    }}
                >
                    <span className="text-3xl mb-2">{emotion.icon}</span>
                    <span className="font-medium">{emotion.name}</span>
                </button>
            ))}
        </div>
    );
}