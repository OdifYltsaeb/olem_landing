'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (error.response?.status && [400, 401, 403, 404, 500].indexOf(error.response?.status) > -1) {
                    return false;
                } else {
                    return failureCount > 2;
                }
            },
        },
    },
});

export const ReactQueryClientProvider = function ({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
