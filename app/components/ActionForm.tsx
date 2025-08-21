"use client";

import { useState } from "react";

interface ActionFormProps {
  variant: "workoutLog" | "statusUpdate";
  onSubmit: (data: any) => void;
}

export function ActionForm({ variant, onSubmit }: ActionFormProps) {
  const [formData, setFormData] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    notes: "",
    energy: 5,
    mood: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (variant === "workoutLog") {
    return (
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h3 className="text-xl font-semibold text-text">Log Your Workout</h3>
        
        <div>
          <label className="block text-sm font-medium text-text mb-2">Exercise</label>
          <input
            type="text"
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
            className="input-field w-full"
            placeholder="e.g., Push-ups, Squats"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Sets</label>
            <input
              type="number"
              name="sets"
              value={formData.sets}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="3"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">Reps</label>
            <input
              type="number"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="12"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">Weight (lbs)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="50"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input-field w-full h-20 resize-none"
            placeholder="How did it feel? Any observations?"
          />
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Log Workout
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="text-xl font-semibold text-text">Update Status</h3>
      
      <div>
        <label className="block text-sm font-medium text-text mb-2">Energy Level (1-10)</label>
        <input
          type="range"
          name="energy"
          value={formData.energy}
          onChange={handleChange}
          className="w-full"
          min="1"
          max="10"
        />
        <div className="flex justify-between text-xs text-text/60 mt-1">
          <span>Low</span>
          <span className="font-medium">{formData.energy}</span>
          <span>High</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-2">Mood (1-10)</label>
        <input
          type="range"
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          className="w-full"
          min="1"
          max="10"
        />
        <div className="flex justify-between text-xs text-text/60 mt-1">
          <span>Poor</span>
          <span className="font-medium">{formData.mood}</span>
          <span>Great</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="input-field w-full h-20 resize-none"
          placeholder="How are you feeling today?"
        />
      </div>

      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Update Status
      </button>
    </form>
  );
}
