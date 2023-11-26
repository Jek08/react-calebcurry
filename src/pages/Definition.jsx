import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Definition() {
    const [word, setWord] = useState();

    useEffect(() => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/dog")
            .then((response) => response.json())
            .then((data) => {
                if (data == undefined) {
                    console.log("Cannot reach freedictionary");
                } else {
                    setWord(data[0].meanings);
                }
            });
    }, []);

    return (
        <>
            <h1>Definition Page</h1>
            {word
                ? word.map((meaning) => {
                      return (
                          <p key={uuidv4()}>
                              {meaning.definitions[0].definition}
                          </p>
                      );
                  })
                : null}
        </>
    );
}
