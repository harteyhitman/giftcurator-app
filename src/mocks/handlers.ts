import notificationHandlers from '@/lib/msw/handlers/notification';
import supportHandlers from '@/lib/msw/handlers/support';
import subscriptionHandlers from '@/lib/msw/handlers/subscription';
import reportHandlers from '@/lib/msw/handlers/report';
import eventHandlers from '@/lib/msw/handlers/event';
import beneficiaryHandlers from '@/lib/msw/handlers/beneficiary';
import dashboardHandlers from '@/lib/msw/handlers/dashboard';

export const handlers = [
  ...dashboardHandlers,
  ...beneficiaryHandlers,
  ...eventHandlers,
  ...reportHandlers,
  ...subscriptionHandlers,
  ...supportHandlers,
  ...notificationHandlers,
];