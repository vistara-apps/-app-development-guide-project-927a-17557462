
"use client";

import { Avatar } from "@coinbase/onchainkit/identity";

interface UserAvatarProps {
  user: any;
  size: 'small' | 'medium';
}

export function UserAvatar({ user, size }: UserAvatarProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
  };

  return (
    <div className="flex items-center space-x-2">
      <Avatar className={`${sizeClasses[size]} rounded-full border-2 border-border-light`} />
      {size === 'medium' && (
        <div>
          <div className="font-medium text-sm">{user.farcasterHandle}</div>
          <div className="text-xs text-text-muted capitalize">
            {user.subscriptionStatus} member
          </div>
        </div>
      )}
    </div>
  );
}
