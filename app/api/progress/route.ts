
import { NextRequest, NextResponse } from 'next/server';

// Mock progress data - in production this would come from your database
const progressData = {
  user123: {
    workoutsCompleted: 23,
    currentStreak: 5,
    totalWorkoutTime: 1240, // minutes
    strengthProgress: {
      'push-ups': { baseline: 8, current: 15, sessions: 12 },
      'pull-ups': { baseline: 2, current: 6, sessions: 10 },
      'squats': { baseline: 20, current: 35, sessions: 8 },
    },
    weeklyProgress: [
      { week: 1, workouts: 2, duration: 90 },
      { week: 2, workouts: 3, duration: 135 },
      { week: 3, workouts: 4, duration: 180 },
      { week: 4, workouts: 3, duration: 135 },
    ],
    goals: [
      {
        id: 'weight_loss',
        name: 'Lose Weight',
        target: 10,
        current: 3.2,
        unit: 'lbs',
        deadline: '2024-03-01'
      },
      {
        id: 'muscle_gain',
        name: 'Build Muscle',
        target: 100,
        current: 67,
        unit: '%',
        deadline: '2024-04-01'
      }
    ]
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'user123';
  const timeframe = searchParams.get('timeframe') || 'month';

  const userProgress = progressData[userId as keyof typeof progressData];

  if (!userProgress) {
    return NextResponse.json(
      { error: 'User progress not found' },
      { status: 404 }
    );
  }

  // Calculate some derived metrics
  const avgWorkoutDuration = Math.round(userProgress.totalWorkoutTime / userProgress.workoutsCompleted);
  const strengthImprovements = Object.entries(userProgress.strengthProgress).map(([exercise, data]) => ({
    exercise,
    improvement: Math.round(((data.current - data.baseline) / data.baseline) * 100)
  }));

  return NextResponse.json({
    ...userProgress,
    derived: {
      avgWorkoutDuration,
      strengthImprovements,
      goalsOnTrack: userProgress.goals.filter(g => (g.current / g.target) >= 0.5).length
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const { userId, metricType, value, date } = await req.json();

    // In production, this would update the database
    const progressEntry = {
      id: `progress_${Date.now()}`,
      userId,
      metricType,
      value,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      progressEntry,
      message: "Progress updated successfully!"
    });

  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
