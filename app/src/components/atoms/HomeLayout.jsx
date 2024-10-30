const HomeLayout = function ({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 flex">{children}</div>
        </div>
    );
};

export default HomeLayout;
