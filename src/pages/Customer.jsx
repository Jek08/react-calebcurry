import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [change, setChange] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("customer ", customer);
        // console.log("tempcustomer ", tempCustomer);
        // console.log(change);
    });

    useEffect(() => {
        const url = baseUrl + "api/customers/" + id;
        fetch(url)
            .then((response) => {
                if (response.status == 404) {
                    setNotFound(true);
                }
                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer);
                setTempCustomer(data.customer);
            });
    }, []);

    function updateCustomer() {
        const url = baseUrl + "api/customers/" + id;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tempCustomer),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChange(false);
                setCustomer(data.customer);
            })
            .catch();
    }

    return (
        <>
            {notFound ? <p>The customer with id: {id} was not found</p> : null}
            {customer ? (
                <div>
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.name}
                        onChange={(e) => {
                            setTempCustomer({
                                ...tempCustomer,
                                name: e.target.value,
                            });
                            setChange(true);
                        }}
                    />
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.industry}
                        onChange={(e) => {
                            setTempCustomer({
                                ...tempCustomer,
                                industry: e.target.value,
                            });
                            setChange(true);
                        }}
                    />
                    {change ? (
                        <>
                            <button
                                onClick={(e) => {
                                    setTempCustomer({ ...customer });
                                    setChange(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button onClick={updateCustomer}>Save</button>
                        </>
                    ) : null}
                </div>
            ) : null}
            <button
                onClick={(e) => {
                    const url = baseUrl + "api/customers/" + id;
                    fetch(url, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Something went wrong");
                            }
                            navigate("/customers");
                        })
                        .catch((e) => console.log(e));
                }}
            >
                Delete
            </button>
            <br />
            <Link to="/customers">Go back</Link>
        </>
    );
}
