import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Content-Type": "application/xml",
  },
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("q");
  const RSS_BASE_URL = process.env.RSS_URL;

  let rssUrl = "";

  if (searchQuery) {
    // 검색어가 있는 경우
    rssUrl = `${RSS_BASE_URL}/search?q=${encodeURIComponent(
      searchQuery
    )}&hl=ko&gl=KR&ceid=KR:ko`;
  } else if (category) {
    // 카테고리가 있는 경우
    switch (category) {
      case "politics":
        rssUrl = `${RSS_BASE_URL}/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNRFZ4ZERBU0FtdHZLQUFQAQ?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
      case "world":
        rssUrl = `${RSS_BASE_URL}/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNR2RtY0hNekVnSnJieWdBUAE?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
      case "tech":
        rssUrl = `${RSS_BASE_URL}/topics/CAAqKAgKIiJDQkFTRXdvSkwyMHZNR1ptZHpWbUVnSnJieG9DUzFJb0FBUAE?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
      case "economy":
        rssUrl = `${RSS_BASE_URL}/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNR2RtY0hNekVnSnJieWdBUAE?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
      case "sports":
        rssUrl = `${RSS_BASE_URL}/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
      case "entertainment":
        rssUrl = `${RSS_BASE_URL}/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
      case "health":
        rssUrl = `${RSS_BASE_URL}/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtdHZLQUFQAQ?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
      default:
        // 헤드라인
        rssUrl = `${RSS_BASE_URL}/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFZxYUdjU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR%3Ako`;
        break;
    }
  } else {
    // 헤드라인
    rssUrl = `${RSS_BASE_URL}/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFZxYUdjU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR%3Ako`;
  }

  try {
    const feed = await parser.parseURL(rssUrl);
    const results = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));
    return NextResponse.json(
      {
        title: feed.title,
        items: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch RSS feed" },
      { status: 500 }
    );
  }
}
