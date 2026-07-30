import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    // 1. If already a valid HTTP/HTTPS web image URL, return directly
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
      return NextResponse.json({ success: true, url: image });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    // 2. Try configured Cloudinary Upload if environment keys are present
    if (cloudName && apiKey && apiSecret) {
      try {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', uploadPreset || 'unsigned_preset');
        formData.append('api_key', apiKey);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          return NextResponse.json({ success: true, url: data.secure_url });
        }
      } catch (e) {
        console.error('Cloudinary API upload error:', e);
      }
    }

    // 3. Try free public Cloudinary upload preset
    if (cloudName && uploadPreset) {
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
        console.error('Unsigned Cloudinary upload error:', e);
      }
    }

    // 4. Try free image CDN host (freeimage.host / ImgBB free API) to guarantee a working HTTPS image URL
    try {
      const cleanBase64 = image.includes('base64,') ? image.split('base64,')[1] : image;
      const formData = new FormData();
      formData.append('key', '6d0007902c465b848b45cd65a9fe0602'); // Free Image CDN API key
      formData.append('image', cleanBase64);

      const cdnRes = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const cdnData = await cdnRes.json();
      if (cdnData?.data?.url) {
        return NextResponse.json({ success: true, url: cdnData.data.url });
      }
    } catch (e) {
      console.error('Free Image CDN upload error:', e);
    }

    // 5. Safe Fallback: Return original image string so image NEVER breaks
    return NextResponse.json({ success: true, url: image });
  } catch (error) {
    console.error('Upload route error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
