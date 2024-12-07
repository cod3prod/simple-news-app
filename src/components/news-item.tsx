import Link from "next/link";
import { memo } from "react";

const NewsItem = memo(function NewsItem({
  title,
  link,
  pubDate,
}: {
  title: string;
  link: string;
  pubDate: string;
}) {
  return (
    <li className="bg-white mb-2 p-4 rounded-md shadow-md hover:bg-gray-100">
      <Link href={link}>
        <h3 className="mb-2 text-lg hover:text-blue-500">{title}</h3>
      </Link>
      <p className="text-gray-500 text-sm">{pubDate}</p>
    </li>
  );
});

NewsItem.displayName = 'NewsItem';

export default NewsItem;
