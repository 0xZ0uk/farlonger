type FileLike = {
  name: string;
  stream: () => ReadableStream;
};

export function jsonToFileLike(json: object, fileName: string): FileLike {
  const jsonString = JSON.stringify(json);
  const blob = new Blob([jsonString], { type: "application/json" });

  const stream = () => blob.stream();

  return {
    name: fileName,
    stream: stream,
  };
}
