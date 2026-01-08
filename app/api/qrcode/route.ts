import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, size = 256, fgColor = '#000000', bgColor = '#FFFFFF', level = 'M', marginSize = 4, includeMargin = true, format = 'png' } = body;

    if (!text || text.trim() === '') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const options = {
      width: size,
      margin: includeMargin ? marginSize : 0,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: level as 'L' | 'M' | 'Q' | 'H',
    };

    let buffer: Buffer;
    let contentType: string;

    if (format === 'svg') {
      const svgString = await QRCode.toString(text, { ...options, type: 'svg' });
      buffer = Buffer.from(svgString, 'utf-8');
      contentType = 'image/svg+xml';
    } else {
      buffer = await QRCode.toBuffer(text, options);
      contentType = 'image/png';
    }

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(buffer);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="qr-code.${format}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
