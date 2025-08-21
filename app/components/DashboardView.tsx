
"use client";

import { WorkoutCard } from "./WorkoutCard";
import { ProgressChart } from "./ProgressChart";
import { UserAvatar } from "./UserAvatar";
import { Calendar, Flame, Trophy } from "lucide-react";

export function DashboardView() {
  const todaysWorkout = {
    id: "1",
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: ["Push-ups", "Pull-ups", "Shoulder Press", "Rows"],
    difficulty: "Intermediate",
    status: "active" as const
  };

  const weeklyProgress = [
    { day: "Mon", completed: 1 },
    { day: "Tue", completed: 1 },
    { day: "Wed", completed: 0 },
    { day: "Thu", completed: 1 },
    { day: "Fri", completed: 0 },
    { day: "Sat", completed: 0 },
    { day: "Sun", completed: 0 },
  ];

  return (
    <div className="space-y-lg animate-slide-up">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-md">
          <UserAvatar variant="medium" />
          <div>
            <h1 className="headline">Welcome back!</h1>
            <p className="body text-muted">Ready for another great workout?</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-sm">
        <div className="card text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-2">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <div className="text-lg font-bold text-primary">7</div>
          <div className="text-xs text-muted">Day Streak</div>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg mx-auto mb-2">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div className="text-lg font-bold text-accent">4/7</div>
          <div className="text-xs text-muted">This Week</div>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-500/10 rounded-lg mx-auto mb-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-lg font-bold text-yellow-600">3</div>
          <div className="text-xs text-muted">Goals Hit</div>
        </div>
      </div>

      {/* Today's Workout */}
      <div>
        <h2 className="headline mb-md">Today's Workout</h2>
        <WorkoutCard workout={todaysWorkout} />
      </div>

      {/* Weekly Progress */}
      <div>
        <h2 className="headline mb-md">This Week's Progress</h2>
        <div className="card">
          <ProgressChart 
            data={weeklyProgress}
            variant="bar"
            height={120}
          />
        </div>
      </div>

      {/* AI Insights */}
      <div className="card bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <h3 className="font-semibold mb-2">🤖 AI Coach Insights</h3>
        <p className="body text-sm">
          You're showing great consistency! Your form has improved 15% this week. 
          Consider increasing weight for your next upper body session.
        </p>
      </div>
    </div>
  );
}
