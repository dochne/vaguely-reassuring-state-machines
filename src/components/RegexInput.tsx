interface Props {
  value: string;
  error: string | null;
  onChange: (arg0: string) => Promise<void>;
}

export function RegexInput({ value, error, onChange }: Props) {
  return (
    <div className="mb-3" style={{ marginTop: "5px" }}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">/^</span>
        </div>
        <input
          type="text"
          className={"form-control" + (error !== null ? " is-invalid" : "")}
          placeholder="regex: e.g. 🤍+"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <div className="input-group-append">
          <span className="input-group-text">$/</span>
        </div>
      </div>
      {error && (
        <div className="invalid-feedback" style={{display: 'block'}}>
          {error}
        </div>
      )}
    </div>
  );
}
