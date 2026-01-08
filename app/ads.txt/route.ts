import { NextResponse } from 'next/server';

export async function GET() {
  // AdSense ads.txt content
  const adsTxtContent = 'google.com, pub-5570650174796895, DIRECT, f08c47fec0942fa0';
  
  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
