import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {
    const [word, setWord] = useState("default");
    const navigate = useNavigate();

    return (
        <form
            className="flex space-between space-x-2 max-w-[300px]"
            onSubmit={() => {
                navigate("/dictionary/" + word);
            }}
        >
            <input
                className="shrink min-w-0 px-2 py-1 rounded"
                placeholder="type a word"
                type="text"
                onChange={(e) => {
                    setWord(e.target.value);
                }}
            />
            <button className="py-1 px-2 bg-green-400 text-white rounded-md hover:bg-green-500">
                Search
            </button>
        </form>
    );
}
