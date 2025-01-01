import { Post } from "../types";
import { AnnotatedTextarea } from "./AnnotatedTextarea";
import { RegexInput } from "./RegexInput";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {
  post: Post;
}

interface StorageProps {
    regex: string,
    valid: string[],
    invalid: string[]
};

function test(regExp: RegExp | null, testCase: string, expectValid = true) {
  if (testCase === "") return "";
  if (regExp === null) return "❌";

  let matches = testCase.match(regExp);
  const success = matches && matches[0] === testCase;

  if (expectValid) {
    return success ? "✅" : "❌";
  }
  return success ? "❌" : "✅";
}

export function Card({ post }: Props) {

  const [state, setState] = useLocalStorage<StorageProps>(`post:${post.cid}`, {regex: "", valid: [], invalid: []});
  const {regex, valid, invalid} = state;

  let regExp = null;
  let error = null;
  try {
    regExp = new RegExp(`^${regex}$`, 'u');
  } catch (err: unknown) {
    error = "Unknown error occurred";
    if (err instanceof Error) {
      error = err.message;
    }
  }

  return (
    <div className="card" id="card">
      <div className="card-header">{post.record.text}</div>

      <div className="card-body">
        <div className="text-center">
          <a
            className="main-link"
            href={`https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`}
          >
            <img
              className="card-image"
              src={post.embed.images[0].fullsize}
              alt={post.embed.images[0].alt}
              style={{ height: "300px" }}
            />
          </a>
        </div>
        <RegexInput
          onChange={async (value) => setState({...state, regex: value})}
          value={regex}
          error={error}
        />

        <AnnotatedTextarea
          value={valid}
          placeholder="list of valid patterns - e.g. 🖤🖤🤍"
          label={"Valid Patterns"}
          annotations={valid.map((v) => test(regExp, v))}
          onChange={async (value) => setState({...state, valid: value})}
        />

        <AnnotatedTextarea
          value={invalid}
          placeholder="list of invalid patterns - e.g. 🖤🖤🤍🤍🤍🖤"
          label={"Invalid Patterns"}
          annotations={invalid.map((v) => test(regExp, v, false))}
          onChange={async (value) => setState({...state, invalid: value})}
        />
      </div>
    </div>
  );
}
