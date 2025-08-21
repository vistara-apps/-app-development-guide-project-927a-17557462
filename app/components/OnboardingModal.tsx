
"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { Target, Activity, TrendingUp } from "lucide-react";

interface OnboardingModalProps {
  onComplete: (userData: any) => void;
  onClose: () => void;
}

export function OnboardingModal({ onComplete, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    fitnessLevel: "",
    goals: [] as string[],
    workoutFrequency: "",
    preferences: ""
  });

  const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];
  
  const goalOptions = [
    "Lose Weight",
    "Build Muscle", 
    "Improve Endurance",
    "Increase Strength",
    "Better Health",
    "Sport Performance"
  ];

  const frequencies = ["2-3 times/week", "4-5 times/week", "6+ times/week"];

  const handleGoalToggle = (goal: string) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleComplete = () => {
    onComplete(userData);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1: return userData.fitnessLevel !== "";
      case 2: return userData.goals.length > 0;
      case 3: return userData.workoutFrequency !== "";
      default: return false;
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Welcome to FitFlow!">
      <div className="space-y-lg">
        {/* Progress */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`flex-1 h-2 rounded ${
                i <= step ? "bg-primary" : "bg-text/10"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Fitness Level */}
        {step === 1 && (
          <div className="space-y-md animate-fade-in">
            <div className="text-center mb-md">
              <Activity className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="headline">What's your fitness level?</h3>
              <p className="body text-muted">Help us personalize your experience</p>
            </div>
            
            <div className="space-y-sm">
              {fitnessLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setUserData(prev => ({ ...prev, fitnessLevel: level }))}
                  className={`w-full p-4 rounded-md border transition-all duration-base text-left ${
                    userData.fitnessLevel === level
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-text/20 hover:border-text/40"
                  }`}
                >
                  <div className="font-medium">{level}</div>
                  <div className="text-sm text-muted">
                    {level === "Beginner" && "New to working out"}
                    {level === "Intermediate" && "Regular exercise routine"}
                    {level === "Advanced" && "Experienced athlete"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <div className="space-y-md animate-fade-in">
            <div className="text-center mb-md">
              <Target className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="headline">What are your goals?</h3>
              <p className="body text-muted">Select all that apply</p>
            </div>
            
            <div className="grid grid-cols-2 gap-sm">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-3 rounded-md border transition-all duration-base ${
                    userData.goals.includes(goal)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-text/20 hover:border-text/40"
                  }`}
                >
                  <div className="text-sm font-medium">{goal}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Frequency */}
        {step === 3 && (
          <div className="space-y-md animate-fade-in">
            <div className="text-center mb-md">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="headline">How often do you want to train?</h3>
              <p className="body text-muted">We'll adapt your plan accordingly</p>
            </div>
            
            <div className="space-y-sm">
              {frequencies.map((freq) => (
                <button
                  key={freq}
                  onClick={() => setUserData(prev => ({ ...prev, workoutFrequency: freq }))}
                  className={`w-full p-4 rounded-md border transition-all duration-base text-left ${
                    userData.workoutFrequency === freq
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-text/20 hover:border-text/40"
                  }`}
                >
                  <div className="font-medium">{freq}</div>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Any specific preferences?</label>
              <textarea
                value={userData.preferences}
                onChange={(e) => setUserData(prev => ({ ...prev, preferences: e.target.value }))}
                placeholder="Equipment available, injuries, time constraints..."
                className="input-field w-full resize-none"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="btn-secondary"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleComplete()}
            disabled={!isStepComplete()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
