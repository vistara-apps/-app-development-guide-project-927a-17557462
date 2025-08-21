"use client";

interface UserAvatarProps {
  user: any;
  size?: "small" | "medium" | "large";
}

export function UserAvatar({ user, size = "medium" }: UserAvatarProps) {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-8 h-8 text-sm";
      case "medium":
        return "w-12 h-12 text-base";
      case "large":
        return "w-16 h-16 text-xl";
      default:
        return "w-12 h-12 text-base";
    }
  };

  // Get initials from user handle or name
  const getInitials = () => {
    if (user.farcasterHandle) {
      return user.farcasterHandle.replace("@", "").charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div
      className={`${getSizeClass()} rounded-full bg-primary text-white flex items-center justify-center font-medium`}
    >
      {getInitials()}
    </div>
  );
}

