import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('🧪 Test Login - Username:', username);

    // Intentar autenticar con FakeStoreAPI
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    console.log('🧪 Test Login - API Status:', response.status);

    const data = await response.json();
    console.log('🧪 Test Login - Has Token:', !!data.token);

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      hasToken: !!data.token,
      data: data,
    });
  } catch (error) {
    console.error('�� Test Login - Error:', error);
    return NextResponse.json(
      { error: 'Error en test login', details: String(error) },
      { status: 500 }
    );
  }
}
