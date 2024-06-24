import { unixfs } from "@helia/unixfs";
import { createHelia } from "helia";
import { json } from "@helia/json";
import { MemoryBlockstore } from "blockstore-core";
import { CID } from "multiformats";

const helia = await createHelia({
  blockstore: new MemoryBlockstore(),
});

const j = json(helia);

export async function storePostOnIPFS(content: string) {
  const fileCid = await j.add(content);

  return {
    fileCid,
  };
}

export async function retrievePostFromIPFS(fileCid: string): Promise<unknown> {
  const post = await j.get(CID.parse(fileCid));

  return post;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function retrievePostsFromDirIPFS(dirCid: string): Promise<any> {
  const fs = unixfs(helia);

  const posts = fs.ls(CID.parse(dirCid));
}
