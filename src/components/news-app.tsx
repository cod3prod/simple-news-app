"use client";

import NewsList from "./news-list";
import { useState, ChangeEvent } from "react";

export default function NewsApp() {
  const [category, setCategory] = useState("headline");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);

  const categories = [
    { id: "headline", name: "헤드라인" },
    { id: "politics", name: "정치" },
    { id: "world", name: "세계" },
    { id: "tech", name: "기술" },
    { id: "economy", name: "경제" },
    { id: "sports", name: "스포츠" },
    { id: "entertainment", name: "연예" },
    { id: "health", name: "건강" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색어가 있으면 카테고리 초기화
    if (searchQuery.trim()) {
      setCategory("");
    }
    setSearchQuery(searchInput);
    setSearchTrigger((prev) => !prev);
  };

  const handleCategoryClick = (categoryId: string) => {
    setCategory(categoryId);
    setSearchQuery("");
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput !== searchQuery) {
      setSearchQuery(searchInput);
      setSearchTrigger(prev => !prev);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
          onBlur={handleSearch}
          placeholder="뉴스 검색..."
          className="w-full p-2 border rounded-lg"
        />
      </form>

      <div className="flex gap-4 mb-4 overflow-x-auto p-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              category === cat.id && !searchQuery
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <NewsList
        category={category}
        searchQuery={searchQuery}
        searchTrigger={searchTrigger}
      />
    </>
  );
}
