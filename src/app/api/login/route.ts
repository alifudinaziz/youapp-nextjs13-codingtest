import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, username } = body;
  const isPasswordProvided = !!password;
  const isEmailOrUsernameProvided = !!email || !!username;

  if (!isPasswordProvided || !isEmailOrUsernameProvided) {
    return NextResponse.json({ message: 'Password is required and either email or username must be provided.' }, { status: 400 });
  }

  try {
    const resLogin = await fetch('https://techtest.youapp.ai/api/login', {
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
    const dataLogin = await resLogin.json();
    const response =  NextResponse.json({
      message: dataLogin.message,
      access_token: dataLogin.access_token
    });
    
    const cookieStore = cookies();
    cookieStore.set({
      name: 'access_token',
      value: dataLogin.access_token,
      maxAge: 60 * 60 * 24
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}