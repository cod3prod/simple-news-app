"use client";

import { useEffect } from "react";
import NewsItem from "./news-item";
import useFetch from "@/hooks/use-fetch";

export default function NewsList() {
  const { data, isLoading, isError, fetchData } = useFetch();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      <ul>
        {!isLoading &&
          !isError &&
          data.map((article, index) => (
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
