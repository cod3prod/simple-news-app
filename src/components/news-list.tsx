"use client";

import { useEffect } from "react";
import NewsItem from "./news-item";
import useFetch from "@/hooks/use-fetch";
import React from "react";
import Loader from "./loader";

interface NewsListProps {
  category: string;
  searchQuery: string;
  onSearch: boolean;
}

export default function NewsList({
  category,
  searchQuery,
  onSearch,
}: NewsListProps) {
  const { data, isLoading, isError, fetchData } = useFetch();

  useEffect(() => {
    fetchData(category, searchQuery);
  }, [category, onSearch]);

  return (
    <section>
      {isLoading && <Loader />}
      {isError && <p>Error fetching data</p>}
      {!isLoading && !isError && data.length === 0 && <p>데이터가 없습니다.</p>}
      <ul>
        {!isLoading &&
          !isError &&
          data &&
          data.length > 0 &&
          data.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title}
              link={news.link}
              pubDate={news.pubDate}
            />
          ))}
      </ul>
    </section>
  );
}
