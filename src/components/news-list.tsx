"use client";

import { Article } from "@/types/news";
import { useEffect, useState } from "react";
import NewsItem from "./news-item";

export default function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const endpoint = `${baseUrl}&apiKey=${apiKey}`;

  async function fetchData() {
    const res = await fetch(endpoint);
    const data = await res.json();
    setArticles(data.articles);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <ul>
        {articles.map((article, index) => (
          <NewsItem
            key={index}
            title={article.title}
            description={article.description ?? ""}
          />
        ))}
      </ul>
    </section>
  );
}
