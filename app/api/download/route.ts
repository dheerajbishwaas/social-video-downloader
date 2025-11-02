import { NextResponse } from "next/server";
import youtubedl from "youtube-dl-exec";

export async function GET(req) {
  const url = new URL(req.url).searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      noCallHome: true,
    });

    return NextResponse.json({
      title: info.title,
      downloadUrl: info.url,
    });
  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}
