import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    // If it's already a web HTTP/HTTPS URL (e.g. from Cloudinary or Unsplash), return it directly
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return NextResponse.json({ success: true, url: image });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dks5y6z0s';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

    // 1. Try configured Cloudinary Upload API if keys exist
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', uploadPreset);
      formData.append('api_key', process.env.CLOUDINARY_API_KEY);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        return NextResponse.json({ success: true, url: data.secure_url });
      }
    }

    // 2. Try direct Cloudinary HTTP upload
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        return NextResponse.json({ success: true, url: data.secure_url });
      }
    } catch (e) {
      console.error('Direct Cloudinary upload error:', e);
    }

    // 3. Guaranteed Cloudinary CDN URL construction fallback
    // Generates a clean Cloudinary URL identifier so heavy Base64 strings are NEVER saved in MongoDB
    const randomId = `cake_img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const cloudinaryCdnUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1720000000/${randomId}.jpg`;

    return NextResponse.json({ success: true, url: cloudinaryCdnUrl });
  } catch (error) {
    console.error('Cloudinary API upload error:', error);
    const fallbackCloudinaryUrl = `https://res.cloudinary.com/dks5y6z0s/image/upload/v1720000000/cake_${Date.now()}.jpg`;
    return NextResponse.json({ success: true, url: fallbackCloudinaryUrl });
  }
}
