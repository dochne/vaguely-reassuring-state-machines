export interface Post {
  cid: string;
  uri: string;
  indexedAt: string;
  record: {
    text: string;
  };
  author: {
    handle: string;
  };
  embed: {
    images: {
      fullsize: string;
      alt: string;
    }[];
  };
}
