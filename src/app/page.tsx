import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to AI Matcher!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your AI job matching platform
        </p>
        <Link 
          href="/quiz"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
        >
          Start Matching →
        </Link>
      </div>
    </main>
  );
}
