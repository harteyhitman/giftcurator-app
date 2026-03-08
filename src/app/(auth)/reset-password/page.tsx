'use client';

import RequestPasswordResetForm from '@/components/forms/RequestPasswordResetForm';

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <RequestPasswordResetForm />
    </div>
  );
}
