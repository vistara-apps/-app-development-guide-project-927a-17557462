"use client";

interface WorkoutCardProps {
  workout: {
    id: string;
    name: string;
    duration: string;
    exercises: number;
    difficulty: string;
    status: "ready" | "scheduled" | "completed";
  };
  variant?: "active" | "scheduled" | "completed";
  onStart?: () => void;
}

export function WorkoutCard({ workout, variant = "active", onStart }: WorkoutCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "active":
        return "border-primary/30 bg-primary/5";
      case "scheduled":
        return "border-border-light bg-surface";
      case "completed":
        return "border-accent/30 bg-accent/5";
      default:
        return "border-border-light bg-surface";
    }
  };

  const getStatusIcon = () => {
    switch (workout.status) {
      case "ready":
        return "🔥";
      case "scheduled":
        return "📅";
      case "completed":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getVariantStyles()} transition-all duration-200 hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{getStatusIcon()}</span>
            <h4 className="font-medium text-text">{workout.name}</h4>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm text-text-muted">
            <div>⏱️ {workout.duration}</div>
            <div>💪 {workout.exercises} exercises</div>
            <div>🎯 {workout.difficulty}</div>
          </div>
        </div>
        
        {variant === "active" && onStart && (
          <button
            onClick={onStart}
            className="btn-primary text-sm px-3 py-1.5"
          >
            Start
          </button>
        )}
        
        {variant === "scheduled" && (
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-muted">
            Upcoming
          </span>
        )}
        
        {variant === "completed" && (
          <span className="text-xs px-2 py-1 bg-accent/10 rounded-full text-accent">
            Completed
          </span>
        )}
      </div>
    </div>
  );
}

