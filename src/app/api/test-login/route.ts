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
      token: data.token,
      username: username,
    });
  } catch (error) {
    console.error('🧪 Test Login - Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return NextResponse.json(
      { 
        error: 'Error en test login', 
        details: errorMessage,
        stack: errorStack 
      },
      { status: 500 }
    );
  }
}
