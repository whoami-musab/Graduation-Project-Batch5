import { NextResponse, NextRequest } from 'next/server';

export default function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const username = searchParams.get('username');
        const data = {"username": username};
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error. Please try again' }, { status: 500 });
    }
}