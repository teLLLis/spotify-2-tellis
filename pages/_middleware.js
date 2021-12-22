import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	const { pathname } = req.nextUrl;

	//Allow the request if the following is true...
	// 1. It's a request for the next-auth session & provider fetching
	// 2. If the token exists
	if (pathname.includes('/api/auth' || token)) {
		return NextResponse.next();
	}

	if (token && pathname === '/login') {
		return NextResponse.redirect('/');
	}

	// Redirect them to login if they dont have a token and are requesting a protected route
	if (!token && pathname !== '/login') {
		return NextResponse.redirect('/login');
	}
	// console.log(token);
}
