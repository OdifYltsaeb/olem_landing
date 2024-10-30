import HomeLayout from 'components/atoms/HomeLayout';

export default function Layout({ children }) {
    return (
        <HomeLayout>
            {children}
        </HomeLayout>
    );
}
