export type FileLike = {
  name: string;
  stream: () => ReadableStream;
};
