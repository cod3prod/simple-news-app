# Simple News App

**RSS Parser를 이용한 뉴스 검색 애플리케이션**

## 🎯 **프로젝트 목적**

### **핵심 목표**

- **RSS Parser**: 언론사에서 제공하는 RSS 피드를 파싱하여 최신 뉴스를 검색하고 제공합니다.
- **API 라우트**: Next.js의 API 라우트를 활용하여 서버에서 RSS 데이터를 처리하고 클라이언트로 전달합니다.

## 🔨 **기술 스택**

- **주요 기술**: Next.js 15
- **스타일링**: Tailwind CSS
- **라이브러리**: rss-parser

## 📝 **핵심 학습 내용**

### 1. RSS Parser

`rss-parser`는 RSS 피드를 간단히 파싱할 수 있는 라이브러리로, 다양한 언론사 및 웹사이트에서 제공하는 RSS 데이터를 JSON 형태로 변환해 줍니다.

```typescript
import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Content-Type": "application/xml",
  },
});
```

### 2. API 라우트

Next.js의 API 라우트를 사용하여 클라이언트 요청을 처리합니다. 사용자는 카테고리와 검색어를 파라미터로 전달하여 원하는 뉴스를 검색할 수 있습니다.

```typescript
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

  // ... 중략

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
```

## ⚙️ **프로젝트 설정**

```bash
# 패키지 설치
npm install

# 로컬 개발 환경 실행
npm run dev
```
