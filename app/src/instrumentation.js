import * as Sentry from '@sentry/nextjs';

export const register = async function () {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await import('../sentry.server.config');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        await import('../sentry.edge.config');
    }
};

export const onRequestError = Sentry.captureRequestError;
