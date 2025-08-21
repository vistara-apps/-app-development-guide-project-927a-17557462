
"use client";

import { useState } from "react";

interface OnboardingFlowProps {
  onComplete: (goals: string[]) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const fitnessGoals = [
    { id: 'lose_weight', label: 'Lose Weight', icon: '⚖️' },
    { id: 'build_muscle', label: 'Build Muscle', icon: '💪' },
    { id: 'improve_endurance', label: 'Improve Endurance', icon: '🏃' },
    { id: 'increase_flexibility', label: 'Increase Flexibility', icon: '🤸' },
    { id: 'general_fitness', label: 'General Fitness', icon: '🎯' },
    { id: 'sport_specific', label: 'Sport-Specific Training', icon: '🏆' },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedGoals.length > 0) {
      setStep(2);
    } else if (step === 2) {
      onComplete(selectedGoals);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {step === 1 && (
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-display text-text">Welcome to FitFlow! 🎉</h2>
            <p className="text-body text-text-muted">
              Your AI-powered fitness coach is ready to help you achieve your goals.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-headline text-text">What are your fitness goals?</h3>
            <p className="text-sm text-text-muted">Select all that apply</p>
            
            <div className="grid grid-cols-2 gap-3">
              {fitnessGoals.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedGoals.includes(goal.id)
                      ? 'border-primary bg-blue-50 text-primary'
                      : 'border-border-light bg-surface text-text hover:border-primary'
                  }`}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div className="text-sm font-medium">{goal.label}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedGoals.length > 0 && (
            <button
              onClick={handleNext}
              className="btn-primary px-8 py-3 animate-scale-in"
            >
              Continue ({selectedGoals.length} selected)
            </button>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="text-center space-y-6 animate-slide-up">
          <div className="space-y-2">
            <h2 className="text-display text-text">Perfect! 🎯</h2>
            <p className="text-body text-text-muted">
              Your AI coach is now calibrating a personalized plan based on your goals.
            </p>
          </div>

          <div className="card space-y-4">
            <h3 className="text-headline text-text">Your Selected Goals:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedGoals.map(goalId => {
                const goal = fitnessGoals.find(g => g.id === goalId);
                return (
                  <span
                    key={goalId}
                    className="px-3 py-1 bg-primary text-white rounded-full text-sm flex items-center space-x-1"
                  >
                    <span>{goal?.icon}</span>
                    <span>{goal?.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="coach-message info">
            <p className="font-medium">🤖 Your AI Coach says:</p>
            <p>"Great choices! I'll create adaptive workouts that evolve with your progress. Ready to start your fitness journey?"</p>
          </div>
        </div>
      )}
    </div>
  );
}
