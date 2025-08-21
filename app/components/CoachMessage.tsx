"use client";

interface CoachMessageProps {
  variant: "info" | "warning" | "success";
  message: string;
  title?: string;
}

export function CoachMessage({ variant, message, title }: CoachMessageProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "info":
        return "bg-primary/10 border-primary/20 text-primary";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-600";
      case "success":
        return "bg-accent/10 border-accent/20 text-accent";
      default:
        return "bg-primary/10 border-primary/20 text-primary";
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "info":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "success":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getVariantStyles()} animate-fade-in`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}
