export default function NewsItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="bg-white mb-2 p-4 rounded-md shadow-md">
      <h3 className="mb-2 text-lg">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </li>
  );
}
