import Link from 'next/link';

const HomeLayout = function ({ children }) {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col min-h-screen container">
                <div className="navbar bg-base-100">
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Link href="/" className="text-4xl font-logo">
                        OLEM
                    </Link>
                </div>
                <div className="flex-1 flex">{children}</div>
            </div>
        </div>
    );
};

export default HomeLayout;
