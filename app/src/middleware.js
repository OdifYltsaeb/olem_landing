import { NextResponse } from 'next/server';

export const middleware = function (request) {
    if (!request.cookies.get(process.env.SESSION_TOKEN_NAME)) {
        return NextResponse.redirect(new URL(`/login?next=${request.nextUrl.pathname}`, request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/dashboard', '/profile/:path*', '/profile', '/ships/:path*', '/ships'],
};
