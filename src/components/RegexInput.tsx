import { useContext } from "react";
import "./RegexInput.css"
import { AlertContext } from "../context/AlertContext";

interface Props {
  value: string;
  error: string | null;
  onChange: (arg0: string) => Promise<void>;
  onShare: () => Promise<void>;
}

export function RegexInput({ value, error, onChange, onShare }: Props) {
  const {setAlert} = useContext(AlertContext);

  return (
    <div className="terminal-card" style={{ marginTop: "5px" }}>
      <div className="input-group mb-3">
        {/* <div className="input-group-prepend"> */}
          {/* <span className="input-group-text">/^</span> */}
        {/* </div> */}
        <input type="text" disabled value="/^" style={{width: '35px', borderRight: 0}} />
        <input
          type="text"
          className={"form-control" + (error !== null ? " is-invalid" : "")}
          placeholder="regex: e.g. 🤍+"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          style={{flexGrow: 1}}
        />
        <input type="text" disabled value="$/" style={{width: '35px', borderLeft: 0}} />
        <button className="btn btn-primary" style={{margin: 0}}
        onClick={async () => {
          await onShare()
          setAlert("Share link copied to clipboard!");
        }}>Share</button>
      </div>
      {error && (
        <div className="terminal-alert terminal-alert-error" style={{margin: '10px'}}>
          {error}
        </div>
      )}
    </div>
  );
}
