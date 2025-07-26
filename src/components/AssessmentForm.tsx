import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AssessmentFormProps {
  onComplete: (result: any) => void;
  onBack: () => void;
}

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; weight: Record<string, number> }[];
}

const questions: Question[] = [
  {
    id: "interests",
    question: "What aspects of AI interest you most?",
    options: [
      { 
        value: "research", 
        label: "Advancing the theoretical foundations of AI",
        weight: { researcher: 3, data_scientist: 1, nlp_engineer: 1, prompt_engineer: 0 }
      },
      { 
        value: "data", 
        label: "Extracting insights from large datasets",
        weight: { researcher: 1, data_scientist: 3, nlp_engineer: 1, prompt_engineer: 1 }
      },
      { 
        value: "language", 
        label: "Making computers understand human language",
        weight: { researcher: 1, data_scientist: 1, nlp_engineer: 3, prompt_engineer: 2 }
      },
      { 
        value: "applications", 
        label: "Building practical AI applications for users",
        weight: { researcher: 0, data_scientist: 2, nlp_engineer: 2, prompt_engineer: 3 }
      }
    ]
  },
  {
    id: "programming",
    question: "What's your programming experience level?",
    options: [
      { 
        value: "beginner", 
        label: "Just starting out with basic concepts",
        weight: { researcher: 0, data_scientist: 1, nlp_engineer: 0, prompt_engineer: 3 }
      },
      { 
        value: "intermediate", 
        label: "Comfortable with Python and basic libraries",
        weight: { researcher: 1, data_scientist: 2, nlp_engineer: 2, prompt_engineer: 2 }
      },
      { 
        value: "advanced", 
        label: "Strong in multiple languages and frameworks",
        weight: { researcher: 2, data_scientist: 3, nlp_engineer: 3, prompt_engineer: 1 }
      },
      { 
        value: "expert", 
        label: "Can implement complex algorithms from scratch",
        weight: { researcher: 3, data_scientist: 2, nlp_engineer: 3, prompt_engineer: 0 }
      }
    ]
  },
  {
    id: "thinking",
    question: "How do you prefer to approach problems?",
    options: [
      { 
        value: "theoretical", 
        label: "Start with mathematical models and theory",
        weight: { researcher: 3, data_scientist: 2, nlp_engineer: 1, prompt_engineer: 0 }
      },
      { 
        value: "analytical", 
        label: "Dive deep into data to find patterns",
        weight: { researcher: 1, data_scientist: 3, nlp_engineer: 2, prompt_engineer: 1 }
      },
      { 
        value: "systematic", 
        label: "Build step-by-step technical solutions",
        weight: { researcher: 2, data_scientist: 1, nlp_engineer: 3, prompt_engineer: 1 }
      },
      { 
        value: "creative", 
        label: "Experiment and iterate quickly",
        weight: { researcher: 0, data_scientist: 1, nlp_engineer: 1, prompt_engineer: 3 }
      }
    ]
  },
  {
    id: "curiosity",
    question: "What drives your curiosity in AI?",
    options: [
      { 
        value: "understand", 
        label: "Understanding how intelligence actually works",
        weight: { researcher: 3, data_scientist: 1, nlp_engineer: 1, prompt_engineer: 0 }
      },
      { 
        value: "predict", 
        label: "Discovering hidden patterns and predictions",
        weight: { researcher: 1, data_scientist: 3, nlp_engineer: 1, prompt_engineer: 1 }
      },
      { 
        value: "communicate", 
        label: "Making AI understand and generate language",
        weight: { researcher: 1, data_scientist: 1, nlp_engineer: 3, prompt_engineer: 2 }
      },
      { 
        value: "solve", 
        label: "Solving real-world problems for people",
        weight: { researcher: 0, data_scientist: 2, nlp_engineer: 2, prompt_engineer: 3 }
      }
    ]
  }
];

const AssessmentForm = ({ onComplete, onBack }: AssessmentFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const scores = {
      researcher: 0,
      data_scientist: 0,
      nlp_engineer: 0,
      prompt_engineer: 0
    };

    // Calculate scores based on weighted answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answer);
      
      if (option) {
        Object.entries(option.weight).forEach(([career, weight]) => {
          scores[career as keyof typeof scores] += weight;
        });
      }
    });

    // Find the highest scoring career
    const topCareer = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    const careerInfo = {
      researcher: {
        title: "AI Researcher",
        description: "You're driven by fundamental questions about intelligence and learning. You enjoy diving deep into mathematical models and contributing to the theoretical foundations of AI.",
        skills: ["Advanced Mathematics", "Research Methodology", "Deep Learning", "Academic Writing"],
        nextSteps: ["Pursue a PhD in AI/ML", "Read research papers daily", "Contribute to open source research", "Attend academic conferences"]
      },
      data_scientist: {
        title: "Data Scientist",
        description: "You excel at finding meaningful patterns in complex datasets. You love turning messy data into actionable insights that drive business decisions.",
        skills: ["Statistics", "Python/R", "Data Visualization", "Machine Learning"],
        nextSteps: ["Master pandas and scikit-learn", "Build a portfolio of data projects", "Learn business domain knowledge", "Practice on Kaggle competitions"]
      },
      nlp_engineer: {
        title: "NLP Engineer",
        description: "You're fascinated by language and communication. You want to build systems that can understand, process, and generate human language naturally.",
        skills: ["Natural Language Processing", "Deep Learning", "Linguistics", "Software Engineering"],
        nextSteps: ["Study transformer architectures", "Build chatbots or text analyzers", "Learn about language models", "Contribute to NLP libraries"]
      },
      prompt_engineer: {
        title: "Prompt Engineer",
        description: "You're creative and experimental, great at finding innovative ways to get AI to solve problems. You excel at understanding how to communicate effectively with AI systems.",
        skills: ["Prompt Design", "AI Model Understanding", "Creative Problem Solving", "User Experience"],
        nextSteps: ["Experiment with different AI models", "Build prompt libraries", "Learn about AI limitations", "Create AI-powered applications"]
      }
    };

    onComplete({
      career: topCareer,
      info: careerInfo[topCareer as keyof typeof careerInfo],
      scores
    });
  };

  const currentQ = questions[currentQuestion];
  const canProceed = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {currentQ.question}
          </h2>

          <RadioGroup 
            value={answers[currentQ.id] || ""} 
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label 
                  htmlFor={option.value} 
                  className="text-base leading-relaxed cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button 
              onClick={nextQuestion}
              disabled={!canProceed}
              className="bg-gradient-primary text-white"
            >
              {currentQuestion === questions.length - 1 ? "Get My Results" : "Next"}
              {currentQuestion < questions.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentForm;