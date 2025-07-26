import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, TrendingUp, BookOpen, Target } from "lucide-react";

interface CareerResultProps {
  result: {
    career: string;
    info: {
      title: string;
      description: string;
      skills: string[];
      nextSteps: string[];
    };
    scores: Record<string, number>;
  };
  onRestart: () => void;
}

const CareerResult = ({ result, onRestart }: CareerResultProps) => {
  const { info, scores } = result;
  
  // Calculate max score for progress bars
  const maxScore = Math.max(...Object.values(scores));
  
  // Career color mapping
  const careerColors = {
    researcher: "bg-purple-500",
    data_scientist: "bg-blue-500", 
    nlp_engineer: "bg-green-500",
    prompt_engineer: "bg-orange-500"
  };

  const careerNames = {
    researcher: "AI Researcher",
    data_scientist: "Data Scientist",
    nlp_engineer: "NLP Engineer", 
    prompt_engineer: "Prompt Engineer"
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={onRestart}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Main Result Card */}
        <Card className="p-8 mb-8 text-center bg-gradient-secondary border-0 shadow-elegant">
          <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
            <Star className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Your Perfect AI Career Path
          </h1>
          
          <h2 className="text-2xl font-semibold text-primary mb-4">
            {info.title}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {info.description}
          </p>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skills Section */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Key Skills to Develop</h3>
            </div>
            <div className="space-y-3">
              {info.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <Badge variant="secondary" className="mr-3">
                    {index + 1}
                  </Badge>
                  <span className="text-base">{skill}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Next Steps Section */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Your Next Steps</h3>
            </div>
            <div className="space-y-3">
              {info.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <Badge variant="outline" className="mr-3 mt-0.5 min-w-6 h-6 flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-base leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Career Match Scores */}
        <Card className="p-6 mt-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold">Your Career Match Scores</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(scores)
              .sort(([,a], [,b]) => b - a)
              .map(([career, score]) => (
                <div key={career} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {careerNames[career as keyof typeof careerNames]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {score}/{maxScore}
                    </span>
                  </div>
                  <Progress 
                    value={(score / maxScore) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your AI Journey?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Now that you know your ideal career path, take the first step towards becoming a successful {info.title}.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={onRestart}
              className="bg-gradient-primary text-white hover:opacity-90"
            >
              Take Assessment Again
            </Button>
            <Button variant="outline">
              Download Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerResult;