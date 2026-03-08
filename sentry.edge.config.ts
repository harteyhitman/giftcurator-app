import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "__DSN__",
  tracesSampleRate: 1.0,
});
