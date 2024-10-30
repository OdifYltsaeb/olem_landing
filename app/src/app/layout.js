import ToastProvider from 'components/atoms/ToastProvider';
import 'react-toastify/dist/ReactToastify.css';

import 'styles/index.css';
import { ReactQueryClientProvider } from 'context/QueryClient';
import GlobalLoading from 'components/atoms/loading/GlobalLoading';

export const metadata = {
    title: 'Olem',
    description: 'Olem',
};

export default function RootLayout({ children }) {
    const getTheme = () => {
        return 'emerald';
    };

    return (
        <ReactQueryClientProvider>
            <html lang="en" data-theme={getTheme()}>
                <body className="min-h-screen">
                    <ToastProvider />
                    <GlobalLoading />
                    {children}
                </body>
            </html>
        </ReactQueryClientProvider>
    );
}
