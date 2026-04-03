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
        { value: 'writing', label: '📝 Writing and Content Creation', weight: { chatgpt: 2, claude: 2, jasper: 3 } },
        { value: 'code', label: '💻 Software Development', weight: { copilot: 3, chatgpt: 2, tabnine: 2 } },
        { value: 'visual', label: '🎨 Design and Visual Content', weight: { midjourney: 3, dalle: 2, canva: 2 } },
        { value: 'data', label: '📊 Data Analysis and Research', weight: { claude: 3, chatgpt: 2, perplexity: 2 } },
        { value: 'business', label: '💼 Business Strategy and Operations', weight: { chatgpt: 2, claude: 2, notion: 2 } },
        { value: 'customer', label: '🤝 Customer Service and Support', weight: { chatgpt: 2, claude: 1, zendesk: 2 } }
      ]
    },
    {
      id: 2,
      question: "What type of output do you need most?",
      options: [
        { value: 'text', label: '📄 Written documents and reports', weight: { chatgpt: 2, claude: 3, jasper: 2 } },
        { value: 'code', label: '⚙️ Code and technical solutions', weight: { copilot: 3, chatgpt: 2, tabnine: 2 } },
        { value: 'images', label: '🖼️ Images and graphics', weight: { midjourney: 3, dalle: 3, canva: 2 } },
        { value: 'insights', label: '💡 Analysis and insights', weight: { claude: 3, perplexity: 2, chatgpt: 2 } },
        { value: 'ideas', label: '💭 Brainstorming and ideas', weight: { chatgpt: 3, claude: 2, notion: 1 } },
        { value: 'answers', label: '❓ Quick answers and facts', weight: { perplexity: 3, chatgpt: 2, claude: 1 } }
      ]
    },
    {
      id: 3,
      question: "How much detail do you typically need?",
      options: [
        { value: 'brief', label: '⚡ Quick and concise', weight: { chatgpt: 2, perplexity: 3, copilot: 2 } },
        { value: 'moderate', label: '📋 Balanced overview', weight: { chatgpt: 3, claude: 2, jasper: 2 } },
        { value: 'detailed', label: '📚 Deep and comprehensive', weight: { claude: 3, chatgpt: 2, notion: 2 } },
        { value: 'technical', label: '🔬 Highly technical', weight: { copilot: 3, claude: 2, tabnine: 2 } }
      ]
    },
    {
      id: 4,
      question: "What is your experience level with AI?",
      options: [
        { value: 'beginner', label: '🌱 Just starting out', weight: { chatgpt: 3, canva: 2, notion: 2 } },
        { value: 'intermediate', label: '📈 Some experience', weight: { chatgpt: 2, claude: 2, copilot: 2 } },
        { value: 'advanced', label: '🚀 Very comfortable', weight: { claude: 2, copilot: 2, midjourney: 3 } },
        { value: 'expert', label: '⚡ Power user', weight: { claude: 3, copilot: 3, midjourney: 2 } }
      ]
    },
    {
      id: 5,
      question: "What is most important to you?",
      options: [
        { value: 'speed', label: '⚡ Speed and efficiency', weight: { chatgpt: 3, copilot: 3, perplexity: 2 } },
        { value: 'quality', label: '✨ High quality output', weight: { claude: 3, midjourney: 3, jasper: 2 } },
        { value: 'ease', label: '😊 Ease of use', weight: { chatgpt: 3, canva: 3, notion: 2 } },
        { value: 'accuracy', label: '🎯 Accuracy and reliability', weight: { claude: 3, perplexity: 2, copilot: 2 } },
        { value: 'creativity', label: '🎨 Creative possibilities', weight: { midjourney: 3, dalle: 3, chatgpt: 2 } }
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
    
    // Calculate scores based on all answers
    questions.forEach((question, index) => {
      const answer = answers[index];
      const option = question.options.find(opt => opt.value === answer);
      
      if (option) {
        Object.entries(option.weight).forEach(([platform, weight]) => {
          scores[platform] = (scores[platform] || 0) + weight;
        });
      }
    });

    // Find the platform with highest score
    const recommendation = Object.entries(scores).reduce((a, b) => 
      a[1] > b[1] ? a : b
    )[0];

    router.push(`/quiz/results?recommendation=${recommendation}`);
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
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <span className="text-lg">{option.label}</span>
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
