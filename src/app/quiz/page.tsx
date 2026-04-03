'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is your primary work focus?",
      options: [
        { value: 'writing', label: '📝 Writing and Content Creation', weight: { chatgpt: 3, claude: 3, jasper: 4, grammarly: 2 } },
        { value: 'code', label: '💻 Software Development', weight: { copilot: 4, cursor: 3, tabnine: 3, chatgpt: 2 } },
        { value: 'visual', label: '🎨 Design and Visual Content', weight: { midjourney: 4, dalle: 3, canva: 4, firefly: 3 } },
        { value: 'data', label: '📊 Data Analysis and Research', weight: { claude: 4, chatgpt: 3, perplexity: 4, copilot: 2 } },
        { value: 'business', label: '💼 Business Strategy and Operations', weight: { chatgpt: 3, claude: 3, notion: 3, gemini: 2 } },
        { value: 'marketing', label: '📢 Marketing and Social Media', weight: { jasper: 4, chatgpt: 3, canva: 3, copyai: 3 } }
      ]
    },
    {
      id: 2,
      question: "What type of output do you need most?",
      options: [
        { value: 'longform', label: '📄 Long-form content (articles, reports)', weight: { claude: 4, chatgpt: 3, jasper: 4, notion: 2 } },
        { value: 'code', label: '⚙️ Code and technical solutions', weight: { copilot: 4, cursor: 4, tabnine: 3, chatgpt: 2 } },
        { value: 'images', label: '🖼️ Images and graphics', weight: { midjourney: 4, dalle: 4, firefly: 3, canva: 3 } },
        { value: 'analysis', label: '💡 Data analysis and insights', weight: { claude: 4, perplexity: 3, chatgpt: 3, copilot: 2 } },
        { value: 'copy', label: '✍️ Marketing copy and ads', weight: { jasper: 4, copyai: 4, chatgpt: 3, claude: 2 } },
        { value: 'research', label: '🔍 Research and fact-checking', weight: { perplexity: 4, claude: 3, chatgpt: 2, gemini: 3 } }
      ]
    },
    {
      id: 3,
      question: "How technical are you?",
      options: [
        { value: 'nontechnical', label: '🌱 Not technical at all', weight: { chatgpt: 4, canva: 4, jasper: 3, grammarly: 3 } },
        { value: 'somewhat', label: '📚 Somewhat technical', weight: { chatgpt: 3, claude: 3, notion: 3, gemini: 2 } },
        { value: 'technical', label: '💻 Very technical', weight: { copilot: 4, cursor: 4, claude: 3, perplexity: 3 } },
        { value: 'developer', label: '🚀 Professional developer', weight: { copilot: 4, cursor: 4, tabnine: 4, claude: 3 } }
      ]
    },
    {
      id: 4,
      question: "What is your budget range?",
      options: [
        { value: 'free', label: '💸 Free only', weight: { chatgpt: 4, gemini: 4, copilot: 1, canva: 2 } },
        { value: 'low', label: '💰 Under $20/month', weight: { chatgpt: 3, claude: 3, grammarly: 3, canva: 3 } },
        { value: 'mid', label: '💳 $20-50/month', weight: { claude: 3, copilot: 4, midjourney: 3, jasper: 2 } },
        { value: 'high', label: '💎 $50+ /month', weight: { cursor: 3, jasper: 4, midjourney: 4, copilot: 3 } }
      ]
    },
    {
      id: 5,
      question: "How much detail do you typically need?",
      options: [
        { value: 'brief', label: '⚡ Quick and concise', weight: { chatgpt: 3, perplexity: 4, gemini: 3, copyai: 3 } },
        { value: 'moderate', label: '📋 Balanced overview', weight: { chatgpt: 4, jasper: 3, canva: 3, notion: 3 } },
        { value: 'detailed', label: '📚 Deep and comprehensive', weight: { claude: 4, chatgpt: 3, copilot: 3, perplexity: 2 } },
        { value: 'technical', label: '🔬 Highly technical and precise', weight: { claude: 4, copilot: 4, cursor: 4, perplexity: 3 } }
      ]
    },
    {
      id: 6,
      question: "What is your experience level with AI tools?",
      options: [
        { value: 'beginner', label: '🌱 Just starting out', weight: { chatgpt: 4, canva: 4, grammarly: 3, gemini: 3 } },
        { value: 'intermediate', label: '📈 Some experience', weight: { chatgpt: 3, claude: 3, jasper: 3, copilot: 2 } },
        { value: 'advanced', label: '🚀 Very comfortable', weight: { claude: 3, copilot: 3, midjourney: 4, cursor: 3 } },
        { value: 'expert', label: '⚡ Power user', weight: { claude: 4, cursor: 4, midjourney: 4, copilot: 4 } }
      ]
    },
    {
      id: 7,
      question: "What is most important to you?",
      options: [
        { value: 'speed', label: '⚡ Speed and efficiency', weight: { chatgpt: 4, copilot: 4, perplexity: 3, gemini: 3 } },
        { value: 'quality', label: '✨ Highest quality output', weight: { claude: 4, midjourney: 4, cursor: 3, jasper: 3 } },
        { value: 'ease', label: '😊 Ease of use', weight: { chatgpt: 4, canva: 4, grammarly: 4, gemini: 3 } },
        { value: 'accuracy', label: '🎯 Accuracy and reliability', weight: { claude: 4, perplexity: 4, copilot: 3, gemini: 3 } },
        { value: 'creativity', label: '🎨 Creative possibilities', weight: { midjourney: 4, dalle: 4, chatgpt: 3, jasper: 3 } },
        { value: 'cost', label: '💰 Cost effectiveness', weight: { chatgpt: 4, gemini: 4, canva: 3, grammarly: 2 } }
      ]
    },
    {
      id: 8,
      question: "How do you prefer to work?",
      options: [
        { value: 'browser', label: '🌐 In my web browser', weight: { chatgpt: 4, claude: 4, perplexity: 4, midjourney: 3 } },
        { value: 'desktop', label: '💻 Desktop application', weight: { cursor: 4, notion: 3, canva: 2, grammarly: 3 } },
        { value: 'ide', label: '⚙️ Inside my code editor', weight: { copilot: 4, cursor: 4, tabnine: 4, chatgpt: 2 } },
        { value: 'mobile', label: '📱 On my phone', weight: { chatgpt: 3, gemini: 3, grammarly: 2, canva: 3 } },
        { value: 'flexible', label: '🔄 Wherever I am', weight: { chatgpt: 4, claude: 3, notion: 3, canva: 3 } }
      ]
    },
    {
      id: 9,
      question: "What is your typical project timeline?",
      options: [
        { value: 'realtime', label: '⚡ Real-time, as I work', weight: { copilot: 4, cursor: 4, grammarly: 4, tabnine: 3 } },
        { value: 'quick', label: '🏃 Quick turnaround (hours)', weight: { chatgpt: 4, perplexity: 4, dalle: 3, copyai: 3 } },
        { value: 'days', label: '📅 A few days', weight: { claude: 4, midjourney: 4, jasper: 3, notion: 3 } },
        { value: 'weeks', label: '📆 Weeks or longer', weight: { claude: 4, notion: 4, cursor: 3, midjourney: 3 } }
      ]
    },
    {
      id: 10,
      question: "What kind of collaboration do you need?",
      options: [
        { value: 'solo', label: '🧑 Just me', weight: { chatgpt: 3, claude: 3, copilot: 3, midjourney: 3 } },
        { value: 'small', label: '👥 Small team (2-5)', weight: { notion: 4, claude: 3, canva: 3, cursor: 3 } },
        { value: 'large', label: '👨‍👩‍👧‍👦 Large team (6+)', weight: { notion: 4, canva: 4, gemini: 3, jasper: 3 } },
        { value: 'client', label: '🤝 Share with clients', weight: { canva: 4, notion: 4, midjourney: 3, jasper: 3 } }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRecommendation();
    }
  };

  const calculateRecommendation = () => {
    const scores: Record<string, number> = {};
    
    questions.forEach((question, index) => {
      const answer = answers[index];
      const option = question.options.find(opt => opt.value === answer);
      
      if (option) {
        Object.entries(option.weight).forEach(([platform, weight]) => {
          scores[platform] = (scores[platform] || 0) + weight;
        });
      }
    });

    const sortedScores = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([platform]) => platform);

    router.push(`/quiz/results?recommendations=${sortedScores.join(',')}`);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="mt-6 text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
