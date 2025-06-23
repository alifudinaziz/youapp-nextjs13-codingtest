import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'No token provided.' });
  }

  try {
    const resGetProfile = await fetch('https://techtest.youapp.ai/api/getProfile', {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      }
    });
    const dataGetProfile = await resGetProfile.json();

    return NextResponse.json({message: dataGetProfile.message, data: dataGetProfile.data});
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = cookies().get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'No token provided.' });
  }

  if (!Array.isArray(body.interests) || !body.interests.every((item: any) => typeof item === 'string')) {
    return NextResponse.json(
      { message: 'Interest must be an array of strings.' }
    );
  }

  try {
    // get data
    const resGetProfile = await fetch('https://techtest.youapp.ai/api/getProfile', {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      }
    });
    const dataGetProfile = await resGetProfile.json();
    const dataInterests = dataGetProfile.data.interests
    dataInterests.push(...body.interests);

    // post data
    const resCreateProfile = await fetch('https://techtest.youapp.ai/api/createProfile', {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': body.name,
        'gender': body.gender,
        'birthday': body.birthday,
        'horoscope': body.horoscope,
        'zodiac': body.zodiac,
        'height': body.height,
        'weight': body.weight,
        'interests': dataInterests
      })
    });
    const dataCreateProfile = await resCreateProfile.json();
    
    return NextResponse.json({message: dataCreateProfile.message, data: dataCreateProfile.data});
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const token = cookies().get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'No token provided.' });
  }

  if (!Array.isArray(body.interests) || !body.interests.every((item: any) => typeof item === 'string')) {
    return NextResponse.json(
      { message: 'Interest must be an array of strings.' }
    );
  }

  try {
    // get data
    const resGetProfile = await fetch('https://techtest.youapp.ai/api/getProfile', {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      }
    });
    const dataGetProfile = await resGetProfile.json();
    const dataInterests = dataGetProfile.data.interests
    dataInterests.push(...body.interests);

    // put data
    const resUpdateProfile = await fetch('https://techtest.youapp.ai/api/updateProfile', {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': body.name,
        'gender': body.gender,
        'birthday': body.birthday,
        'horoscope': body.horoscope,
        'zodiac': body.zodiac,
        'height': body.height,
        'weight': body.weight,
        'interests': dataInterests
      })
    });
    const dataUpdateProfile = await resUpdateProfile.json();
    
    return NextResponse.json({message: dataUpdateProfile.message, data: dataUpdateProfile.data});
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}