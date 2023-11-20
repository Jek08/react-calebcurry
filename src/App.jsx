import { useState } from "react";
import "./App.css";
import Employee from "./components/Employee";

function App() {
    const [role, setRole] = useState("dev");

    return (
        <>
            <input
                type="text"
                onChange={(e) => {
                    e.preventDefault();
                    setRole(e.target.value);
                }}
            />
            <Employee name="Nuna" role={role} />
            <Employee name="Emily" role={role} />
        </>
    );
}

export default App;
