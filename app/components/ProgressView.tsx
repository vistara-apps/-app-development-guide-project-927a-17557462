
"use client";

import { useState } from "react";
import { ProgressChart } from "./ProgressChart";

interface ProgressViewProps {
  user: any;
  onBack: () => void;
}

export function ProgressView({ user, onBack }: ProgressViewProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  // Mock progress data
  const progressData = {
    workoutsCompleted: [
      { date: '2024-01-01', value: 2 },
      { date: '2024-01-08', value: 3 },
      { date: '2024-01-15', value: 4 },
      { date: '2024-01-22', value: 3 },
      { date: '2024-01-29', value: 5 },
    ],
    strengthProgress: [
      { exercise: 'Push-ups', baseline: 8, current: 15, improvement: 87 },
      { exercise: 'Pull-ups', baseline: 2, current: 6, improvement: 200 },
      { exercise: 'Squats', baseline: 20, current: 35, improvement: 75 },
    ],
    goals: [
      { name: 'Lose Weight', target: 10, current: 3.2, unit: 'lbs' },
      { name: 'Build Muscle', target: 100, current: 67, unit: '%' },
      { name: 'Workout Streak', target: 30, current: 12, unit: 'days' },
    ]
  };

  const achievements = [
    { title: 'First Workout', icon: '🎯', date: 'Jan 1, 2024' },
    { title: 'Week Warrior', icon: '🔥', date: 'Jan 8, 2024' },
    { title: 'Form Master', icon: '⭐', date: 'Jan 15, 2024' },
    { title: 'Consistency King', icon: '👑', date: 'Jan 22, 2024' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display text-text">Progress Report 📊</h2>
          <p className="text-body text-text-muted">Track your fitness journey</p>
        </div>
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          ← Back
        </button>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-1 bg-surface rounded-lg p-1 border border-border-light">
        {(['week', 'month', 'year'] as const).map(period => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              timeframe === period
                ? 'bg-primary text-white'
                : 'text-text-muted hover:text-text'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Goals Progress */}
      <div className="space-y-4">
        <h3 className="text-headline text-text">Goals Progress</h3>
        <div className="grid grid-cols-1 gap-4">
          {progressData.goals.map((goal, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{goal.name}</span>
                <span className="text-sm text-text-muted">
                  {goal.current}{goal.unit} / {goal.target}{goal.unit}
                </span>
              </div>
              <div className="w-full bg-border-light rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Chart */}
      <div className="space-y-4">
        <h3 className="text-headline text-text">Workout Activity</h3>
        <div className="card">
          <ProgressChart data={progressData.workoutsCompleted} type="line" />
        </div>
      </div>

      {/* Strength Progress */}
      <div className="space-y-4">
        <h3 className="text-headline text-text">Strength Gains</h3>
        <div className="space-y-3">
          {progressData.strengthProgress.map((exercise, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{exercise.exercise}</div>
                  <div className="text-sm text-text-muted">
                    {exercise.baseline} → {exercise.current} reps
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-accent font-bold">+{exercise.improvement}%</div>
                  <div className="text-sm text-text-muted">improvement</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="text-headline text-text">Achievements 🏆</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="card text-center">
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <div className="font-medium text-sm">{achievement.title}</div>
              <div className="text-xs text-text-muted">{achievement.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
