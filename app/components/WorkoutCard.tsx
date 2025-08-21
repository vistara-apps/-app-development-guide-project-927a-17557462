
"use client";

interface WorkoutCardProps {
  workout: {
    id: string;
    name: string;
    duration: string;
    exercises: number;
    difficulty: string;
    status: 'ready' | 'completed' | 'scheduled';
  };
  variant: 'active' | 'completed' | 'scheduled';
  onStart?: () => void;
}

export function WorkoutCard({ workout, variant, onStart }: WorkoutCardProps) {
  const getStatusColor = () => {
    switch (variant) {
      case 'active':
        return 'border-primary bg-blue-50';
      case 'completed':
        return 'border-accent bg-green-50';
      case 'scheduled':
        return 'border-border-light bg-surface';
      default:
        return 'border-border-light bg-surface';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-text-muted bg-bg';
    }
  };

  return (
    <div className={`card ${getStatusColor()} transition-all duration-200 hover:shadow-modal`}>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="font-semibold text-text">{workout.name}</h4>
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <span>⏱️ {workout.duration}</span>
              <span>🎯 {workout.exercises} exercises</span>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
            {workout.difficulty}
          </span>
        </div>

        {variant === 'active' && onStart && (
          <button
            onClick={onStart}
            className="btn-primary w-full"
          >
            Start Workout
          </button>
        )}

        {variant === 'completed' && (
          <div className="flex items-center justify-between">
            <span className="text-accent font-medium text-sm">✅ Completed</span>
            <button className="text-primary text-sm hover:text-primary-hover transition-colors">
              View Details
            </button>
          </div>
        )}

        {variant === 'scheduled' && (
          <div className="text-text-muted text-sm">
            📅 Scheduled for tomorrow
          </div>
        )}
      </div>
    </div>
  );
}
