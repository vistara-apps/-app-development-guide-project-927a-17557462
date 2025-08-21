"use client";

import { useState, useEffect } from "react";
import { CoachMessage } from "./CoachMessage";
import { ChatInterface } from "./ChatInterface";

interface WorkoutSessionProps {
  workout: any;
  onComplete: () => void;
}

export function WorkoutSession({ workout, onComplete }: WorkoutSessionProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [repsCompleted, setRepsCompleted] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
      if (isResting && restTime > 0) {
        setRestTime(prev => prev - 1);
      } else if (isResting && restTime === 0) {
        setIsResting(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, restTime]);

  const currentExerciseData = workout.exercises[currentExercise];
  const progress = ((currentExercise * currentExerciseData.sets + currentSet) / 
    (workout.exercises.reduce((sum: number, ex: any) => sum + ex.sets, 0))) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completeSet = () => {
    if (currentSet < currentExerciseData.sets - 1) {
      setCurrentSet(prev => prev + 1);
      setRepsCompleted(0);
      setIsResting(true);
      setRestTime(60); // 60 second rest
    } else if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setCurrentSet(0);
      setRepsCompleted(0);
      setIsResting(true);
      setRestTime(90); // 90 second rest between exercises
    } else {
      onComplete();
    }
  };

  const aiCoachMessages = [
    {
      type: "success" as const,
      message: "Perfect form on that last set! Keep your core tight for the next one.",
      avatar: "🤖",
      timestamp: "Just now",
    },
    {
      type: "info" as const,
      message: "Focus on controlled movement. Quality over speed!",
      avatar: "🎯",
      timestamp: "30s ago",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-display text-text">{workout.name}</h2>
        <div className="flex items-center justify-center space-x-4 text-sm text-text-muted">
          <span>⏱️ {formatTime(sessionTime)}</span>
          <span>🔥 {Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-text-muted">
          <span>Exercise {currentExercise + 1} of {workout.exercises.length}</span>
          <span>Set {currentSet + 1} of {currentExerciseData.sets}</span>
        </div>
        <div className="w-full bg-border-light rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Rest Timer */}
      {isResting && (
        <div className="card text-center bg-yellow-50 border-yellow-200 animate-scale-in">
          <div className="text-2xl font-bold text-yellow-600">{formatTime(restTime)}</div>
          <div className="text-sm text-yellow-700">Rest Time Remaining</div>
          <button
            onClick={() => {
              setIsResting(false);
              setRestTime(0);
            }}
            className="mt-3 btn-primary text-sm"
          >
            Skip Rest
          </button>
        </div>
      )}

      {/* Current Exercise */}
      {!isResting && (
        <div className="card space-y-4">
          <div className="text-center">
            <h3 className="text-headline text-text">{currentExerciseData.name}</h3>
            <p className="text-text-muted">
              Set {currentSet + 1} of {currentExerciseData.sets} • Target: {currentExerciseData.reps} reps
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{repsCompleted}</div>
              <div className="text-sm text-text-muted">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{currentExerciseData.reps}</div>
              <div className="text-sm text-text-muted">Target</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{Math.max(0, currentExerciseData.reps - repsCompleted)}</div>
              <div className="text-sm text-text-muted">Remaining</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setRepsCompleted(prev => Math.max(0, prev - 1))}
              className="btn-secondary flex-1"
              disabled={repsCompleted === 0}
            >
              - Rep
            </button>
            <button
              onClick={() => setRepsCompleted(prev => Math.min(currentExerciseData.reps * 2, prev + 1))}
              className="btn-primary flex-1"
            >
              + Rep
            </button>
          </div>

          <button
            onClick={completeSet}
            className="btn-primary w-full py-3"
            disabled={repsCompleted === 0}
          >
            Complete Set
          </button>
        </div>
      )}

      {/* AI Coach Feedback */}
      <div className="space-y-3">
        {aiCoachMessages.map((message, index) => (
          <CoachMessage
            key={index}
            type={message.type}
            message={message.message}
            avatar={message.avatar}
            timestamp={message.timestamp}
          />
        ))}
      </div>

      {/* Chat Interface */}
      <div className="mt-6">
        <h3 className="text-headline text-text mb-3">Ask Your Coach</h3>
        <ChatInterface userId="user123" context={{ workout: workout.name, currentExercise: currentExerciseData.name }} />
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-secondary p-3 text-center">
          <div className="text-lg mb-1">📹</div>
          <div className="text-sm">Form Check</div>
        </button>
        <button className="btn-secondary p-3 text-center">
          <div className="text-lg mb-1">📝</div>
          <div className="text-sm">Add Note</div>
        </button>
      </div>
    </div>
  );
}
