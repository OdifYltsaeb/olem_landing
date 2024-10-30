import Link from 'next/link';

const Custom403 = function () {
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <h1 className="text-5xl font-bold flex flex-row items-center font-fancy">
                <span>403</span>
                <div className="divider lg:divider-horizontal" />
                <span>Access Denied</span>
            </h1>
            <p className="mt-4">Oops! You do not have permission to access this page.</p>
            <Link href="/" className="link">
                Go back to the homepage
            </Link>
        </div>
    );
};
export default Custom403;
