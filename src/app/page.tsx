import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
          StackMatch
        </h1>
        <p className="text-2xl text-purple-200 mb-12 font-light">
          Find the perfect AI platform for your business needs
        </p>
        <Link 
          href="/quiz"
          className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50"
        >
          Start Matching →
        </Link>
        <p className="text-gray-400 text-sm mt-8">
          Answer a few questions • Get matched instantly
        </p>
      </div>
    </main>
  );
}
