export const READ_NOTIFICATIONS_COOKIE = 'giftcurator-read-notifications';

export function parseReadNotificationIds(value?: string) {
  if (!value) {
    return new Set<string>();
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return new Set<string>();
    }

    return new Set(parsed.filter((item): item is string => typeof item === 'string'));
  } catch {
    return new Set<string>();
  }
}
