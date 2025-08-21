"use client";

import { useState } from "react";

interface OnboardingFlowProps {
  onComplete: (goals: string[]) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState<string>("");
  const [workoutFrequency, setWorkoutFrequency] = useState<string>("");
  
  const goals = [
    { id: "lose_weight", label: "Lose Weight", icon: "⚖️" },
    { id: "build_muscle", label: "Build Muscle", icon: "💪" },
    { id: "improve_endurance", label: "Improve Endurance", icon: "🏃" },
    { id: "increase_flexibility", label: "Increase Flexibility", icon: "🧘" },
    { id: "reduce_stress", label: "Reduce Stress", icon: "🧠" },
    { id: "improve_health", label: "Improve Overall Health", icon: "❤️" },
  ];
  
  const fitnessLevels = [
    { id: "beginner", label: "Beginner", description: "New to fitness or returning after a long break" },
    { id: "intermediate", label: "Intermediate", description: "Consistent workouts for 3-6 months" },
    { id: "advanced", label: "Advanced", description: "Regular training for 1+ years" },
  ];
  
  const frequencies = [
    { id: "2_3_week", label: "2-3 times per week" },
    { id: "3_4_week", label: "3-4 times per week" },
    { id: "4_5_week", label: "4-5 times per week" },
    { id: "5_plus_week", label: "5+ times per week" },
  ];
  
  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(selectedGoals);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const isStepComplete = () => {
    if (step === 1) return selectedGoals.length > 0;
    if (step === 2) return fitnessLevel !== "";
    if (step === 3) return workoutFrequency !== "";
    return false;
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-display text-text">Welcome to FitFlow</h2>
        <p className="text-body text-text-muted mt-2">Let's personalize your fitness journey</p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex justify-between items-center">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s < step
                  ? "bg-accent text-white"
                  : s === step
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-text-muted"
              }`}
            >
              {s < step ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s
              )}
            </div>
            <div className="text-xs mt-1 text-text-muted">
              {s === 1 ? "Goals" : s === 2 ? "Level" : "Schedule"}
            </div>
          </div>
        ))}
      </div>
      
      {/* Step Content */}
      <div className="card min-h-[300px]">
        {/* Step 1: Fitness Goals */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-headline text-text">What are your fitness goals?</h3>
            <p className="text-sm text-text-muted">Select all that apply to you</p>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              {goals.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedGoals.includes(goal.id)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border-light hover:border-primary/30"
                  }`}
                >
                  <div className="text-xl mb-2">{goal.icon}</div>
                  <div className="font-medium">{goal.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 2: Fitness Level */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-headline text-text">What's your fitness level?</h3>
            <p className="text-sm text-text-muted">This helps us tailor workouts to your experience</p>
            
            <div className="space-y-3 mt-4">
              {fitnessLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setFitnessLevel(level.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    fitnessLevel === level.id
                      ? "border-primary bg-primary/5"
                      : "border-border-light hover:border-primary/30"
                  }`}
                >
                  <div className="font-medium text-text">{level.label}</div>
                  <div className="text-sm text-text-muted mt-1">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 3: Workout Frequency */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-headline text-text">How often do you want to work out?</h3>
            <p className="text-sm text-text-muted">We'll create a schedule that works for you</p>
            
            <div className="space-y-3 mt-4">
              {frequencies.map(freq => (
                <button
                  key={freq.id}
                  onClick={() => setWorkoutFrequency(freq.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    workoutFrequency === freq.id
                      ? "border-primary bg-primary/5"
                      : "border-border-light hover:border-primary/30"
                  }`}
                >
                  <div className="font-medium text-text">{freq.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 ? (
          <button onClick={handleBack} className="btn-secondary">
            Back
          </button>
        ) : (
          <div></div> // Empty div for spacing
        )}
        
        <button
          onClick={handleNext}
          disabled={!isStepComplete()}
          className={`btn-primary ${!isStepComplete() ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {step < 3 ? "Next" : "Complete Setup"}
        </button>
      </div>
    </div>
  );
}

