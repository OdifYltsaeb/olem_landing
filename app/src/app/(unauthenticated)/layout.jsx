import HomeLayout from 'components/atoms/HomeLayout';
import ToastProvider from 'components/atoms/ToastProvider';

export default function Layout({ children }) {
    return (
        <>
            <ToastProvider />
            <HomeLayout>{children}</HomeLayout>
        </>
    );
}
