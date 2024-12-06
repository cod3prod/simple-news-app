"use client";

import { Article } from "@/types/news";
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
      const res = await fetch(endpoint);
      const data = await res.json();
      setData(data.articles);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, fetchData };
}
