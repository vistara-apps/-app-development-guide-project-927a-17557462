
import { NextRequest, NextResponse } from 'next/server';

// Mock workout data - in production this would come from your database
const workouts = [
  {
    id: "upper1",
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: [
      { name: "Push-ups", sets: 3, reps: 12 },
      { name: "Pull-ups", sets: 3, reps: 8 },
      { name: "Dips", sets: 3, reps: 10 },
      { name: "Pike Push-ups", sets: 3, reps: 8 },
      { name: "Tricep Extensions", sets: 3, reps: 12 },
      { name: "Bicep Curls", sets: 3, reps: 15 },
    ],
    difficulty: "Intermediate",
    tags: ["strength", "upper_body"],
  },
  {
    id: "cardio1",
    name: "Cardio & Core",
    duration: "30 min",
    exercises: [
      { name: "Jumping Jacks", sets: 3, reps: 30 },
      { name: "Burpees", sets: 3, reps: 10 },
      { name: "Mountain Climbers", sets: 3, reps: 20 },
      { name: "Plank", sets: 3, reps: 60 },
    ],
    difficulty: "Beginner",
    tags: ["cardio", "core"],
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const difficulty = searchParams.get('difficulty');

  let filteredWorkouts = [...workouts];

  if (difficulty) {
    filteredWorkouts = filteredWorkouts.filter(w => 
      w.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  return NextResponse.json({
    workouts: filteredWorkouts,
    total: filteredWorkouts.length
  });
}

export async function POST(req: NextRequest) {
  try {
    const { userId, workoutId, completedAt, performance } = await req.json();

    // In production, save to database
    const logEntry = {
      id: `log_${Date.now()}`,
      userId,
      workoutId,
      completedAt,
      performance,
      createdAt: new Date().toISOString(),
    };

    // Mock response - in production this would save to database
    return NextResponse.json({
      success: true,
      logEntry,
      message: "Workout logged successfully!"
    });

  } catch (error) {
    console.error('Workout logging error:', error);
    return NextResponse.json(
      { error: 'Failed to log workout' },
      { status: 500 }
    );
  }
}
