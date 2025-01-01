import { HAPPY_AUTOMATA_ACTOR } from "../constants";
import { cache } from "../helpers/cache";
import { useAwait } from "./useAwait";

export function usePosts() {
  return useAwait(() =>
    cache(
      "feed",
      async () => {
        const response = await fetch(
          `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${HAPPY_AUTOMATA_ACTOR}`,
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const feed = await response.json();

        return (
          feed["feed"]
            .filter(
              // @ts-ignore
              (entry) =>
                entry.post.record.text.indexOf("#") === -1 && // no state machines that are words
                entry.post.author.did === HAPPY_AUTOMATA_ACTOR && // no reposts!
                entry.post.record.embed.images.length > 0, // and only posts with images!
            )
            // @ts-ignore
            .map((value) => value.post)
        );
      },
      60 * 5,
    ),
  );
}
