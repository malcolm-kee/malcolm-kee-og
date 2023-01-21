import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const font = fetch(
  'https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff'
).then((res) => res.arrayBuffer());

const semiBoldFont = fetch(
  'https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff'
).then((res) => res.arrayBuffer());

const extraBoldFont = fetch(
  'https://fonts.cdnfonts.com/s/19795/Inter-ExtraBold.woff'
).then((res) => res.arrayBuffer());

export default async function OgImage(req: NextRequest) {
  try {
    const fontData = await font;
    const semiBoldFontData = await semiBoldFont;
    const extraBoldFontData = await extraBoldFont;

    const { searchParams } = new URL(req.url);

    const title = searchParams.has('title')
      ? searchParams.get('title')!.slice(0, 100)
      : 'Front end engineer that loves building tools';

    const type = searchParams.get('type');
    const date = searchParams.get('date');

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
            position: 'relative',
            fontFamily: '"Inter"',
          }}
        >
          <div tw="absolute top-0 bottom-0 left-0 bg-teal-500 w-6" />
          <div
            style={{ height: 60 }}
            tw="flex justify-between items-center w-full pl-12 pr-6"
          >
            {type ? (
              <div tw="text-2xl text-gray-700" style={{ fontWeight: 600 }}>
                {type.toUpperCase()}
              </div>
            ) : (
              <div />
            )}
            <div
              tw="text-3xl text-teal-500"
              style={{
                fontWeight: 600,
              }}
            >
              malcolmkee.com
            </div>
          </div>
          <div
            tw="flex-1 flex flex-col w-full justify-center items-start pl-12"
            style={{
              gap: 12,
            }}
          >
            <div
              tw="text-left"
              style={{
                fontSize: titleLength <= 20 ? 100 : 80,
                paddingRight: 240,
                fontWeight: 800,
                paddingBottom: 40,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ height: 60 }} tw="w-full" />
          {date && (
            <div
              tw="text-4xl"
              style={{ position: 'absolute', left: 48, bottom: 36 }}
            >
              {date}
            </div>
          )}
          <div
            style={{
              width: 260,
              height: 260,
              right: 14,
              bottom: 2,
            }}
            tw="absolute rounded-full border-4 border-teal-300"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="https://github.com/malcolm-kee.png"
            width={240}
            height={240}
            tw="absolute bottom-3 right-6 rounded-full"
          />
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: semiBoldFontData,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'Inter',
            data: extraBoldFontData,
            style: 'normal',
            weight: 800,
          },
        ],
      }
    );
  } catch (err: any) {
    console.log(`${err.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
