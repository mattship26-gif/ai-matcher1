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
      question: "What's your primary work focus?",
      options: [
        { value: 'writing', label: '📝 Writing & Content Creation', weight: { chatgpt: 2, claude: 2, jasper: 3 } },
        { value: 'code', label: '💻 Software Development', weight: { copilot: 3, chatgpt: 2, tabnine: 2 } },
        { value: 'visual', label: '🎨 Design & Visual Content', weight: { midjourney: 3, dalle: 2, canva: 2 } },
        { value: 'data', label: '📊 Data Analysis & Research', weight: { claude: 3, chatgpt: 2, perplexity: 2 } },
        { value: 'business', label: '💼 Business Strategy & Operations', weight: { chatgpt: 2, claude: 2, notion: 2 } },
        { value: 'customer', label: '🤝 Customer Service & Support', weight: { chatgpt: 2, claude: 1, zendesk: 2 } }
      ]
    },
    {
      id: 2,
      question: "What type of output do you need most?",
      options: [
        { value: 'text', label: '📄 Written documents & reports', weight: { chatgpt: 2, claude: 3, jasper: 2 } },
        { value: 'code', label: '⚙️ Code & technical solutions', weight: { copilot: 3, chatgpt: 2, tabnine: 2 } },
        { value: 'images', label: '🖼️ Images & graphics', weight: { midjourney: 3, dalle: 3, canva: 2 } },
        { value: 'insights', label: '💡 Analysis & insights', weight: { claude: 3, perplexity: 2, chatgpt: 2 } },
        { value: 'ideas', label: '💭 Brainstorming & ideas', weight: { chatgpt: 3, claude: 2, notion: 1 } },
        { value: 'answers', label: '❓ Quick answers & facts', weight: { perplexity: 3, chatgpt: 2, claude: 1 } }
      ]
    },
    {
      id: 3,
      question: "How much detail do you typically need?",
      options: [
        { value: 'brief', label: '⚡ Quick & concise', weight: { chatgpt: 2, perplexity: 3, copilot: 2 } },
        { value: 'moderate', label: '📋 Balanced overview', weight: { chatgpt: 3, claude: 2, jasper: 2 } },
        { value: 'detailed', label: '📚 Deep & comprehensive', weight: { claude: 3, chatgpt: 2, notion: 2 } },
        { value: 'technical', label: '🔬 Highly technical', weight: { copilot: 3, claude: 2, tabnine: 2 } }
      ]
    },
    {
      id: 4,
      question: "What's your
