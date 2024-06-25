export type Post = {
  title: string;
  content: string;
  author: Author;
};

export type Author = {
  fid: number;
  name: string;
  avatar: string;
};
