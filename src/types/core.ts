export type Post = {
  title: string;
  excerpt?: string;
  content: string;
  author: Author;
};

export type Author = {
  fid: string;
  name: string;
  avatar: string;
};
