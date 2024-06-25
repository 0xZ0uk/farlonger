import { createHelia } from "helia";
import { json } from "@helia/json";
import { MemoryBlockstore } from "blockstore-core";
import { CID } from "multiformats";
import type { Post } from "@/types/core";

const helia = await createHelia({
  blockstore: new MemoryBlockstore(),
});

const j = json(helia);

export async function storePostOnIPFS(post: Post) {
  const content = JSON.stringify({ post });

  const fileCid = await j.add(content);

  return {
    fileCid,
  };
}

export async function retrievePostFromIPFS(fileCid: string): Promise<any> {
  const post = await j.get(CID.parse(fileCid));

  return post;
}
