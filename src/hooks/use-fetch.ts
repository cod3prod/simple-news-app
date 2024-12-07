"use client";

import { News, NewsResponse } from "@/types/news";
import { useState } from "react";

export default function useFetch() {
  const [data, setData] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchData = async (category?: string, searchQuery?: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      let url = baseUrl;
      if (searchQuery) {
        url += `?q=${encodeURIComponent(searchQuery)}`;
      } else if (category) {
        url += `?category=${category}`;
      }
      console.log(url);
      const res = await fetch(url!);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: NewsResponse = await res.json();
      if (responseData?.items) {
        setData(responseData.items);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, fetchData };
}
