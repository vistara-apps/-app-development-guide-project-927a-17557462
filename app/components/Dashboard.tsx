
"use client";

import { useState } from "react";
import { WorkoutCard } from "./WorkoutCard";
import { CoachMessage } from "./CoachMessage";
import { UserAvatar } from "./UserAvatar";

interface DashboardProps {
  user: any;
  onStartWorkout: () => void;
  onViewProgress: () => void;
}

export function Dashboard({ user, onStartWorkout, onViewProgress }: DashboardProps) {
  const [currentWeek] = useState(2);
  const [completedWorkouts] = useState(8);
  const [streak] = useState(5);

  const todaysWorkout = {
    id: "today1",
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: 6,
    difficulty: "Intermediate",
    status: "ready",
  };

  const upcomingWorkouts = [
    {
      id: "tomorrow",
      name: "Cardio & Core",
      duration: "30 min",
      exercises: 4,
      difficulty: "Beginner",
      status: "scheduled",
    },
    {
      id: "day3",
      name: "Lower Body Power",
      duration: "50 min",
      exercises: 8,
      difficulty: "Advanced",
      status: "scheduled",
    },
  ];

  const coachMessage = {
    type: "info" as const,
    message: "Looking strong this week! Your form on squats has improved by 15%. Ready for today's upper body challenge?",
    avatar: "🤖",
    timestamp: "2 minutes ago",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display text-text">Welcome back! 👋</h2>
          <p className="text-body text-text-muted">Ready to crush your goals today?</p>
        </div>
        <UserAvatar user={user} size="medium" />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary">{completedWorkouts}</div>
          <div className="text-sm text-text-muted">Workouts</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent">{streak}</div>
          <div className="text-sm text-text-muted">Day Streak</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-text">Week {currentWeek}</div>
          <div className="text-sm text-text-muted">Current</div>
        </div>
      </div>

      {/* AI Coach Message */}
      <CoachMessage
        type={coachMessage.type}
        message={coachMessage.message}
        avatar={coachMessage.avatar}
        timestamp={coachMessage.timestamp}
      />

      {/* Today's Workout */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-headline text-text">Today's Workout</h3>
          <button
            onClick={onViewProgress}
            className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
          >
            View Progress →
          </button>
        </div>
        
        <WorkoutCard
          workout={todaysWorkout}
          variant="active"
          onStart={onStartWorkout}
        />
      </div>

      {/* Upcoming Workouts */}
      <div className="space-y-4">
        <h3 className="text-headline text-text">Coming Up</h3>
        <div className="space-y-3">
          {upcomingWorkouts.map(workout => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              variant="scheduled"
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-secondary p-4 text-center">
          <div className="text-lg mb-1">📊</div>
          <div className="text-sm font-medium">View Analytics</div>
        </button>
        <button className="btn-secondary p-4 text-center">
          <div className="text-lg mb-1">⚙️</div>
          <div className="text-sm font-medium">Adjust Goals</div>
        </button>
      </div>
    </div>
  );
}
