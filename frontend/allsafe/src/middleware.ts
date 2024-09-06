import { NextResponse } from 'next/server'

export function middleware(request: {
    headers: { get: (arg0: string) => any }
}) {
    const authHeader = request.headers.get('authorization')

    if (authHeader) {
        const auth = authHeader.split(' ')[1]
        const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

        // Replace 'groupproject' and 'securepass123' with your desired username and password
        if (
            user === process.env.AUTH_USERNAME &&
            pwd === process.env.AUTH_PASSWORD
        ) {
            return NextResponse.next()
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    })
}

export const config = {
    matcher: '/:path*',
}
