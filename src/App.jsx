import { useState } from "react";
import "./App.css";
import Employee from "./components/Employee";

function App() {
    const [role, setRole] = useState("dev");

    return (
        <div className="App">
            {/* <input
                type="text"
                onChange={(e) => {
                    e.preventDefault();
                    setRole(e.target.value);
                }}
            /> */}
            <div className="flex flex-wrap">
                <Employee
                    name="Nuna"
                    role={role}
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTQuyO8Mw-k4JUoKh5MnfhfMz4AycLb2Ujw&usqp=CAU"
                />
                <Employee
                    name="Emily"
                    role={role}
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTQuyO8Mw-k4JUoKh5MnfhfMz4AycLb2Ujw&usqp=CAU"
                />
                <Employee
                    name="Will"
                    role={role}
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTQuyO8Mw-k4JUoKh5MnfhfMz4AycLb2Ujw&usqp=CAU"
                />
                <Employee
                    name="Nuna"
                    role={role}
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTQuyO8Mw-k4JUoKh5MnfhfMz4AycLb2Ujw&usqp=CAU"
                />
                <Employee
                    name="Emily"
                    role={role}
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTQuyO8Mw-k4JUoKh5MnfhfMz4AycLb2Ujw&usqp=CAU"
                />
                <Employee
                    name="Will"
                    role={role}
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTQuyO8Mw-k4JUoKh5MnfhfMz4AycLb2Ujw&usqp=CAU"
                />
            </div>
        </div>
    );
}

export default App;
