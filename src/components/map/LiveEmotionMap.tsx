'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EmotionType } from '@/types/emotion';

// حل مشكلة أيقونات leaflet في Next.js
;
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/markers/marker-icon-2x.png',
    iconUrl: '/markers/marker-icon.png',
    shadowUrl: '/markers/marker-shadow.png',
});

// تعريف الألوان والرموز لكل شعور
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

interface EmotionMarker {
    id: string;
    location: [number, number];
    emotion: EmotionType;
    message?: string;
    timestamp: Date;
}

interface LiveEmotionMapProps {
    emotions: EmotionMarker[];
}

export default function LiveEmotionMap({ emotions }: LiveEmotionMapProps) {
    return (
        <MapContainer
            center={[24.7136, 46.6753]}
            zoom={3}
            style={{ height: '500px', width: '100%' }}
            className="rounded-xl shadow-lg z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {emotions.map((emotion) => {
                const config = emotionConfig[emotion.emotion];

                return (
                    <Marker
                        key={emotion.id}
                        position={emotion.location}
                        icon={L.divIcon({
                            className: `w-8 h-8 rounded-full flex items-center justify-center text-lg ${config.color} animate-pulse`,
                            html: config.icon,
                        })}
                    >
                        <Popup>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xl ${config.color} rounded-full w-8 h-8 flex items-center justify-center`}>
                                    {config.icon}
                                </span>
                                <span className="font-bold capitalize">{emotion.emotion}</span>
                            </div>
                            {emotion.message && <p className="text-gray-700">{emotion.message}</p>}
                            <p className="text-xs text-gray-500 mt-2">
                                {new Date(emotion.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}