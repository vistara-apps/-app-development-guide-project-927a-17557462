
"use client";

import { useState } from "react";
import { Send, Star } from "lucide-react";

interface ActionFormProps {
  variant: "workoutLog" | "statusUpdate";
  onSubmit: (data: any) => void;
}

export function ActionForm({ variant, onSubmit }: ActionFormProps) {
  const [formData, setFormData] = useState({
    feeling: 5,
    difficulty: 5,
    notes: "",
    energy: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const StarRating = ({ value, onChange, label }: { 
    value: number; 
    onChange: (value: number) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-colors duration-fast"
          >
            <Star 
              size={20} 
              className={star <= value ? "text-yellow-500 fill-current" : "text-muted"}
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (variant === "workoutLog") {
    return (
      <form onSubmit={handleSubmit} className="space-y-md">
        <StarRating
          value={formData.feeling}
          onChange={(value) => setFormData(prev => ({ ...prev, feeling: value }))}
          label="How did you feel overall?"
        />
        
        <StarRating
          value={formData.difficulty}
          onChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
          label="How challenging was it?"
        />
        
        <StarRating
          value={formData.energy}
          onChange={(value) => setFormData(prev => ({ ...prev, energy: value }))}
          label="Your energy level?"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Additional notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any thoughts on today's workout?"
            className="input-field w-full resize-none"
            rows={3}
          />
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
          <Send size={16} />
          <span>Submit Feedback</span>
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">How are you feeling today?</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Tell your AI coach about your current state..."
          className="input-field w-full resize-none"
          rows={3}
        />
      </div>

      <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
        <Send size={16} />
        <span>Update Status</span>
      </button>
    </form>
  );
}
