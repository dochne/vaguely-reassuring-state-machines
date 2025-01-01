import "./RegexInput.css"

interface Props {
  value: string;
  error: string | null;
  onChange: (arg0: string) => Promise<void>;
}

export function RegexInput({ value, error, onChange }: Props) {
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
        {/* <div className="input-group-append"> */}
          {/* <span className="input-group-text">$/</span> */}
        {/* </div> */}
      </div>
      {error && (
        <div className="terminal-alert terminal-alert-error" style={{margin: '10px'}}>
          {error}
        </div>
      )}
    </div>
  );
}
