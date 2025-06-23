import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, username } = body;

  if (!email || !password || !username) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const res = await fetch('https://techtest.youapp.ai/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': body.email,
        'username': body.username,
        'password': body.password
      })
    });
    
    const data = await res.json();
    return NextResponse.json({ message: data.message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
