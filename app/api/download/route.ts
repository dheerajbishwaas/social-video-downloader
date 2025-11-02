import { NextRequest, NextResponse } from "next/server";
import youtubedl from "youtube-dl-exec";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url).searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  const ytPath = "C:\\Users\\YourName\\AppData\\Roaming\\Python\\Scripts\\yt-dlp.exe";

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      binaryPath: ytPath,
    });

    return NextResponse.json({
      title: info.title,
      downloadUrl: info.url,
    });
  } catch (err: any) {
    console.error("yt-dlp error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
