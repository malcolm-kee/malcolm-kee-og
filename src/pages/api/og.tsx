import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function OgImage(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.has('title')
      ? searchParams.get('title')!.slice(0, 100)
      : 'Malcolm Kee';

    const titleLength = title.length;

    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{ height: 60 }}
            tw="flex justify-between items-center w-full px-3"
          >
            <div tw="text-3xl font-bold text-teal-500">malcolmkee.com</div>
          </div>
          <div tw="flex-1 flex w-full justify-center items-center">
            <div
              tw="text-center"
              style={{ fontSize: titleLength <= 20 ? 128 : 96 }}
            >
              {title}
            </div>
          </div>
          <div style={{ height: 60 }} tw="w-full" />
        </div>
      ),
      {
        width: 1200,
        height: 600,
      }
    );
  } catch (err: any) {
    console.log(`${err.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
