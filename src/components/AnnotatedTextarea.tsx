import { useRef } from "react";
import "./AnnotatedTextarea.css";

interface Props {
  label: string;
  placeholder: string;
  annotations: string[];
  value: string[];
  onChange: (arg0: string[]) => Promise<void>;
}

export function AnnotatedTextarea({
  placeholder,
  label,
  annotations,
  onChange,
  value
}: Props) {
  const annotationRef = useRef<HTMLDivElement>(null);
  return (
    <div className="terminal-card">
      <header>{label}</header>
      <div className="textarea-container">
        <div className="test-results" ref={annotationRef}>
          {annotations.join("\n")}
        </div>
        <textarea
          placeholder={placeholder}
          onScroll={(e) => {
            annotationRef.current!.scrollTop = e.currentTarget.scrollTop;
          }}
          onChange={(e) =>
            onChange(
              e.currentTarget.value !== ""
                ? e.currentTarget.value.split("\n")
                : [],
            )
          }
          value={value.join("\n")}
        >
        </textarea>
      </div>
    </div>
  );
}
