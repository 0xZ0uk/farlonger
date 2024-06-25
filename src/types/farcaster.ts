// Create a type for the cast
export type Cast = {
  text: string;
  signerId: string;
  parentUrl: string | null;
  embeds:
    | {
        url: string;
        castId: {
          fid: number;
          hash: string;
        };
      }[]
    | null;
  mentions: number[] | null;
  mentionsPositions: number[] | null;
  parentCastId: {
    fid: number;
    hash: string;
  } | null;
};
