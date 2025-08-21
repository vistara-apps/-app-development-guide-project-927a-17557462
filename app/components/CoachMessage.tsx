
"use client";

interface CoachMessageProps {
  type: 'info' | 'warning' | 'success';
  message: string;
  avatar: string;
  timestamp: string;
}

export function CoachMessage({ type, message, avatar, timestamp }: CoachMessageProps) {
  return (
    <div className={`coach-message ${type} animate-slide-up`}>
      <div className="flex items-start space-x-3">
        <div className="text-xl">{avatar}</div>
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">AI Coach</p>
          <p className="text-sm">{message}</p>
          <p className="text-xs opacity-70 mt-2">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}
