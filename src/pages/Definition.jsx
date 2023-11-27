import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "./NotFound";

export default function Definition() {
    const [word, setWord] = useState();
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    let { search } = useParams();

    useEffect(() => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
            .then((response) => {
                if (response.status == 404) {
                    setNotFound(true);
                } else if (response.status == 401) {
                    navigate("/login");
                } else if (response.status == 500) {
                    setError(true);
                }

                if (!response.ok) {
                    setError(true);
                    throw new Error("Something went wrong");
                }
                return response.json();
            })
            .then((data) => {
                setWord(data[0].meanings);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    if (notFound === true) {
        return (
            <>
                <NotFound />
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }
    if (error === true) {
        return (
            <>
                <p>Something went wrong</p>
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    return (
        <>
            {word ? (
                <>
                    <h1>Definition Page</h1>
                    {word.map((meaning) => {
                        return (
                            <p key={uuidv4()}>
                                {meaning.partOfSpeech + " : "}
                                {meaning.definitions[0].definition}
                            </p>
                        );
                    })}{" "}
                </>
            ) : null}
        </>
    );
}
