export type News = {
  title: string;
  link: string;
  pubDate: string;
};

export type NewsResponse = {
  title: string;
  items: News[];
};
