import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export function Alert() {
    const {message} = useContext(AlertContext);

    if (!message) {
        return null;
    }
    return (
        <div style={{position: 'absolute', top: '80px', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff'}}>
            <div className="terminal-alert terminal-alert-primary" style={{padding: '8px'}}>
                {message}
            </div>
        </div>
    );
}
