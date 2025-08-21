
"use client";

import { useState } from "react";
import { ActionForm } from "./ActionForm";
import { CoachMessage } from "./CoachMessage";
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  completed: boolean;
  notes?: string;
}

export function WorkoutView() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Push-ups",
      sets: 3,
      reps: "12-15",
      completed: false
    },
    {
      id: "2", 
      name: "Pull-ups",
      sets: 3,
      reps: "8-10",
      completed: false
    },
    {
      id: "3",
      name: "Shoulder Press",
      sets: 3,
      reps: "10-12",
      weight: "20 lbs",
      completed: false
    },
    {
      id: "4",
      name: "Bent-over Rows",
      sets: 3,
      reps: "12-15",
      weight: "25 lbs", 
      completed: false
    }
  ]);

  const handleExerciseComplete = (exerciseId: string) => {
    setExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      )
    );
    
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setShowFeedbackForm(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentEx = exercises[currentExercise];
  const completedCount = exercises.filter(ex => ex.completed).length;

  return (
    <div className="space-y-lg animate-slide-up">
      {/* Workout Header */}
      <div className="card">
        <div className="flex justify-between items-center mb-md">
          <div>
            <h1 className="headline">Upper Body Strength</h1>
            <p className="body text-muted">45 min • Intermediate</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{formatTime(timer)}</div>
            <div className="text-xs text-muted">Workout Time</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-text/10 rounded-full h-2 mb-sm">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-slow"
            style={{ width: `${(completedCount / exercises.length) * 100}%` }}
          />
        </div>
        <div className="text-sm text-muted">
          {completedCount} of {exercises.length} exercises completed
        </div>
      </div>

      {/* AI Coach Message */}
      <CoachMessage 
        variant="success"
        message="Great form on those push-ups! Focus on controlled movement for maximum benefit."
      />

      {/* Current Exercise */}
      {currentEx && !showFeedbackForm && (
        <div className="card">
          <div className="flex justify-between items-start mb-md">
            <div>
              <h2 className="headline">{currentEx.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-muted mt-1">
                <span>{currentEx.sets} sets</span>
                <span>{currentEx.reps} reps</span>
                {currentEx.weight && <span>{currentEx.weight}</span>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted">Exercise</div>
              <div className="text-lg font-bold text-primary">
                {currentExercise + 1}/{exercises.length}
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center space-x-md mb-md">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="btn-primary flex items-center space-x-2"
            >
              {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
              <span>{isTimerRunning ? "Pause" : "Start"}</span>
            </button>
            <button
              onClick={() => setTimer(0)}
              className="btn-secondary flex items-center space-x-2"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>

          {/* Complete Exercise Button */}
          <button
            onClick={() => handleExerciseComplete(currentEx.id)}
            className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-md transition-colors duration-base flex items-center justify-center space-x-2"
          >
            <CheckCircle size={16} />
            <span>Complete Exercise</span>
          </button>
        </div>
      )}

      {/* Exercise List */}
      <div className="space-y-sm">
        <h3 className="headline">Exercise List</h3>
        {exercises.map((exercise, index) => (
          <div 
            key={exercise.id}
            className={`card transition-all duration-base cursor-pointer ${
              index === currentExercise && !showFeedbackForm
                ? "border-primary bg-primary/5" 
                : exercise.completed
                ? "border-accent bg-accent/5"
                : "hover:bg-surface/80"
            }`}
            onClick={() => !exercise.completed && setCurrentExercise(index)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                exercise.completed 
                  ? "bg-accent text-white" 
                  : index === currentExercise
                  ? "bg-primary text-white"
                  : "bg-text/10 text-muted"
              }`}>
                {exercise.completed ? (
                  <CheckCircle size={16} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{exercise.name}</div>
                <div className="text-sm text-muted">
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.weight && ` @ ${exercise.weight}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Feedback Form */}
      {showFeedbackForm && (
        <div className="card">
          <h3 className="headline mb-md">How was your workout?</h3>
          <ActionForm
            variant="workoutLog"
            onSubmit={(data) => {
              console.log("Workout feedback:", data);
              setShowFeedbackForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
