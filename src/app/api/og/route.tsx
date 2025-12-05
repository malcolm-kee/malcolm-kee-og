import { ImageResponse } from 'next/og';

const f = (url: string) => fetch(url).then((res) => res.arrayBuffer());
const fontBase = 'https://fonts.cdnfonts.com/s/29947';

const font = f(`${fontBase}/ChakraPetch-Regular.woff`);

const semiBoldFont = f(`${fontBase}/ChakraPetch-SemiBold.woff`);

const extraBoldFont = f(`${fontBase}/ChakraPetch-Bold.woff`);

export async function GET(req: Request) {
  try {
    const [fontData, semiBoldFontData, extraBoldFontData] = await Promise.all([
      font,
      semiBoldFont,
      extraBoldFont,
    ]);

    const { searchParams } = new URL(req.url);

    const title = searchParams.has('title')
      ? searchParams.get('title')!.slice(0, 100)
      : 'Front end engineer that loves building tools';

    const heading = searchParams.get('heading') || searchParams.get('type');
    const date = searchParams.get('date');
    const bgImage = searchParams.get('bgImage');
    const borderColor = searchParams.get('borderColor');
    const primaryColor = (borderColor || '14b8a6').replace(/^#/, '');

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
          <div
            tw="absolute top-0 bottom-0 left-0 w-6"
            style={{
              backgroundColor: `#${primaryColor}`,
            }}
          />
          <div
            tw="absolute top-0 bottom-0 right-0 w-6"
            style={{
              backgroundColor: `#${primaryColor}`,
            }}
          />
          {bgImage && (
            <img
              src={bgImage}
              height={500}
              tw="absolute"
              style={{
                right: 30,
                top: 50,
                opacity: '0.2',
                objectFit: 'cover',
              }}
              alt=""
            />
          )}
          <div
            style={{ height: 60 }}
            tw="flex justify-between items-center w-full px-12"
          >
            {heading ? (
              <div tw="text-2xl text-gray-700" style={{ fontWeight: 600 }}>
                {heading.toUpperCase()}
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
              style={
                {
                  fontSize: titleLength <= 20 ? 100 : 80,
                  paddingRight: 260,
                  fontWeight: 800,
                  paddingBottom: 40,
                  textWrap: 'balance',
                } as any
              }
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
              right: 38,
              bottom: 2,
              borderColor: `#${primaryColor}`,
            }}
            tw="absolute rounded-full border-4"
          />
          <img
            alt=""
            src="https://github.com/malcolm-kee.png"
            width={240}
            height={240}
            tw="absolute bottom-3 right-12 rounded-full"
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
