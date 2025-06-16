import { EmotionType } from '@/types/emotion';

// واجهة تمثل بيانات المستخدم
interface UserData {
    id: string;
    emotion: EmotionType;
    location: [number, number];
    timestamp: Date;
    keywords: string[];
}

// خوارزمية التوصية البسيطة
export const findEmotionMatch = (
    currentUser: UserData,
    otherUsers: UserData[]
): UserData | null => {
    // 1. تصفية المستخدمين الذين يشعرون بنفس المشاعر
    const sameEmotionUsers = otherUsers.filter(
        user => user.emotion === currentUser.emotion && user.id !== currentUser.id
    );

    if (sameEmotionUsers.length === 0) return null;

    // 2. ترتيب المستخدمين حسب القرب الجغرافي
    const sortedByLocation = sameEmotionUsers.sort((a, b) => {
        const distA = calculateDistance(currentUser.location, a.location);
        const distB = calculateDistance(currentUser.location, b.location);
        return distA - distB;
    });

    // 3. ترتيب المستخدمين حسب التوقيت (الأحدث أولاً)
    const sortedByTime = sortedByLocation.sort((a, b) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
    });

    // 4. ترتيب المستخدمين حسب تشابه الكلمات المفتاحية
    const sortedByKeywords = sortedByTime.sort((a, b) => {
        const similarityA = calculateKeywordSimilarity(currentUser.keywords, a.keywords);
        const similarityB = calculateKeywordSimilarity(currentUser.keywords, b.keywords);
        return similarityB - similarityA;
    });

    return sortedByKeywords[0] || null;
};

// حساب المسافة بين موقعين (باستخدام صيغة هافرساين)
const calculateDistance = (
    loc1: [number, number],
    loc2: [number, number]
): number => {
    const [lat1, lon1] = loc1;
    const [lat2, lon2] = loc2;

    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // المسافة بالكيلومتر
};

// حساب تشابه الكلمات المفتاحية
const calculateKeywordSimilarity = (
    keywords1: string[],
    keywords2: string[]
): number => {
    const set1 = new Set(keywords1);
    const set2 = new Set(keywords2);

    const intersection = [...set1].filter(keyword => set2.has(keyword)).length;
    const union = new Set([...keywords1, ...keywords2]).size;

    return union === 0 ? 0 : intersection / union;
};

// تحويل المشاعر إلى إيموجي
export const emotionToEmoji = (emotion: EmotionType): string => {
    const emojiMap: Record<EmotionType, string> = {
        joy: '😊',
        sadness: '😢',
        gratitude: '🙏',
        excitement: '🎉',
        peace: '☮️',
        love: '❤️',
        anxiety: '😰',
        loneliness: '👤',
    };
    return emojiMap[emotion] || '❓';
};


export type { EmotionType };

