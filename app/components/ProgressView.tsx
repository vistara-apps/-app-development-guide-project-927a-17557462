"use client";

import { useState } from "react";
import { CoachMessage } from "./CoachMessage";

interface ProgressViewProps {
  user: any;
  onBack: () => void;
}

export function ProgressView({ user, onBack }: ProgressViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "goals">("overview");
  
  // Mock data
  const progressData = {
    workoutsCompleted: 24,
    totalMinutes: 720,
    streakDays: 5,
    weightLifted: 2450,
    caloriesBurned: 4800,
  };
  
  const workoutHistory = [
    { id: "w1", name: "Upper Body Power", date: "Today", duration: "45 min", performance: "Great" },
    { id: "w2", name: "Cardio Blast", date: "Yesterday", duration: "30 min", performance: "Good" },
    { id: "w3", name: "Lower Body Focus", date: "2 days ago", duration: "50 min", performance: "Excellent" },
    { id: "w4", name: "Core Crusher", date: "3 days ago", duration: "25 min", performance: "Good" },
    { id: "w5", name: "Full Body HIIT", date: "5 days ago", duration: "40 min", performance: "Great" },
  ];
  
  const fitnessGoals = [
    { id: "g1", name: "Lose 5kg", progress: 60, target: "5kg", current: "3kg" },
    { id: "g2", name: "Run 5km", progress: 80, target: "5km", current: "4km" },
    { id: "g3", name: "Bench Press 80kg", progress: 75, target: "80kg", current: "60kg" },
  ];
  
  const coachInsight = {
    type: "success" as const,
    message: "You're making excellent progress! Your consistency in upper body workouts is paying off with a 15% strength increase over the last month.",
    avatar: "🎯",
    timestamp: "Updated today",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-primary hover:text-primary-hover transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h2 className="text-display text-text">Your Progress</h2>
      </div>
      
      {/* Coach Insight */}
      <CoachMessage
        type={coachInsight.type}
        message={coachInsight.message}
        avatar={coachInsight.avatar}
        timestamp={coachInsight.timestamp}
      />
      
      {/* Tabs */}
      <div className="flex border-b border-border-light">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-text-muted hover:text-text"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "history"
              ? "text-primary border-b-2 border-primary"
              : "text-text-muted hover:text-text"
          }`}
        >
          Workout History
        </button>
        <button
          onClick={() => setActiveTab("goals")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "goals"
              ? "text-primary border-b-2 border-primary"
              : "text-text-muted hover:text-text"
          }`}
        >
          Goals
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="pt-2">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-primary">{progressData.workoutsCompleted}</div>
                <div className="text-sm text-text-muted">Workouts</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-accent">{progressData.totalMinutes}</div>
                <div className="text-sm text-text-muted">Minutes</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-text">{progressData.streakDays}</div>
                <div className="text-sm text-text-muted">Day Streak</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-primary">{progressData.weightLifted} kg</div>
                <div className="text-sm text-text-muted">Total Weight Lifted</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-accent">{progressData.caloriesBurned}</div>
                <div className="text-sm text-text-muted">Calories Burned</div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-headline text-text mb-4">Weekly Activity</h3>
              <div className="h-40 flex items-end justify-between">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-primary rounded-t-md transition-all duration-300"
                      style={{ 
                        height: `${[30, 45, 20, 60, 75, 40, 0][i]}%`,
                        opacity: [30, 45, 20, 60, 75, 40, 0][i] ? 1 : 0.3
                      }}
                    />
                    <div className="mt-2 text-xs text-text-muted">{day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {workoutHistory.map(workout => (
              <div key={workout.id} className="card flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-text">{workout.name}</h4>
                  <div className="text-sm text-text-muted">{workout.date} • {workout.duration}</div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    workout.performance === "Excellent" ? "bg-accent/10 text-accent" :
                    workout.performance === "Great" ? "bg-primary/10 text-primary" :
                    "bg-gray-100 text-text-muted"
                  }`}>
                    {workout.performance}
                  </span>
                  <button className="ml-3 text-primary hover:text-primary-hover">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Goals Tab */}
        {activeTab === "goals" && (
          <div className="space-y-4">
            {fitnessGoals.map(goal => (
              <div key={goal.id} className="card space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-text">{goal.name}</h4>
                  <span className="text-sm text-text-muted">{goal.current} / {goal.target}</span>
                </div>
                <div className="w-full bg-border-light rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
            
            <button className="btn-primary w-full py-3 mt-4">
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Goal
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

