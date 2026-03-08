'use client';

import zxcvbn from 'zxcvbn';

export default function PasswordStrength({ password }: { password?: string }) {
  const score = password ? zxcvbn(password).score : 0;

  const getStrength = () => {
    switch (score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Fair';
      case 2:
        return 'Good';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full ${score === 0 ? 'bg-red-500' : score === 1 ? 'bg-orange-500' : score === 2 ? 'bg-yellow-500' : score === 3 ? 'bg-green-500' : 'bg-green-500'}`}
          style={{ width: `${(score + 1) * 20}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-500">{getStrength()}</div>
    </div>
  );
}
