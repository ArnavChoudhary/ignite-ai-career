import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AssessmentForm from "@/components/AssessmentForm";
import CareerResult from "@/components/CareerResult";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'result'>('landing');
  const [careerResult, setCareerResult] = useState<any>(null);

  const startAssessment = () => {
    setCurrentView('assessment');
  };

  const showResult = (result: any) => {
    setCareerResult(result);
    setCurrentView('result');
  };

  const resetToLanding = () => {
    setCurrentView('landing');
    setCareerResult(null);
  };

  if (currentView === 'assessment') {
    return <AssessmentForm onComplete={showResult} onBack={resetToLanding} />;
  }

  if (currentView === 'result') {
    return <CareerResult result={careerResult} onRestart={resetToLanding} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                AI Career Path
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Find the AI role that matches your interests, skills, and ambitions. From AI Researcher to Prompt Engineer - we'll guide you to your ideal career.
            </p>
            <Button 
              size="lg" 
              onClick={startAssessment}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-elegant"
            >
              Start Your Career Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Use AI Career Predictor?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our intelligent assessment considers your unique background and interests to provide personalized career recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Assessment</h3>
              <p className="text-muted-foreground">
                Answer guided questions about your interests, experience, and thinking style.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Results</h3>
              <p className="text-muted-foreground">
                Get matched to specific AI roles with detailed explanations and next steps.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Guidance</h3>
              <p className="text-muted-foreground">
                Learn about growth paths, required skills, and how to get started in AI.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your AI Career?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of professionals who have discovered their perfect AI career path.
          </p>
          <Button 
            size="lg" 
            onClick={startAssessment}
            className="bg-gradient-primary text-white hover:opacity-90 font-semibold px-8 py-4"
          >
            Take the Assessment Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
