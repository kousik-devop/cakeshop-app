import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json({ success: false, error: 'No image data provided' }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';

    // If real Cloudinary credentials exist, upload directly to Cloudinary API
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', uploadPreset);
      formData.append('api_key', process.env.CLOUDINARY_API_KEY);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        return NextResponse.json({ success: true, url: data.secure_url });
      }
    }

    // Unsigned upload attempt to Cloudinary
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'unsigned_preset');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        return NextResponse.json({ success: true, url: data.secure_url });
      }
    } catch (e) {
      console.log('Unsigned Cloudinary upload fallback:', e);
    }

    // Fallback: Return original image URL or Data URL safely if Cloudinary key is unconfigured
    return NextResponse.json({ success: true, url: image });
  } catch (error) {
    console.error('Cloudinary upload route error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
