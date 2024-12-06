"use client";

import { Article, NewsResponse } from "@/types/news";
import { useState } from "react";

export default function useFetch() {
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const endpoint = `${baseUrl}&apiKey=${apiKey}`;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      
      const responseData = (await res.json()) as NewsResponse;
      if (responseData?.articles && Array.isArray(responseData.articles)) {
        setData(responseData.articles);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, fetchData };
}
