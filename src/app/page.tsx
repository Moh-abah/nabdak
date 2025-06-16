// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-purple-800">نبضك</h1>
        <p className="text-lg text-gray-600 mt-2">منصة الشعور اللحظي المباشر</p>
      </header>

      <Link
        href="/emotion/record"
        className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
      >
        شارك شعورك الآن
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link href="/emotion/record" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl mb-2">💖</div>
          <h2 className="text-xl font-semibold">شارك شعورك</h2>
          <p className="text-gray-600 mt-2">سجل مشاعرك اللحظية</p>
        </Link>

        <Link href="/map" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl mb-2">🌍</div>
          <h2 className="text-xl font-semibold">الخريطة الحية</h2>
          <p className="text-gray-600 mt-2">شاهد مشاعر العالم</p>
        </Link>

        <Link href="/events" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl mb-2">✨</div>
          <h2 className="text-xl font-semibold">الأحداث</h2>
          <p className="text-gray-600 mt-2">انضم لموجات المشاعر</p>
        </Link>

        
          
      </div>
    </div>
  );
}