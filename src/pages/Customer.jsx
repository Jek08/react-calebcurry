import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [change, setChange] = useState(false);
    const [error, setError] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!customer) return;
        if (!tempCustomer) return;
        let equal = true;
        if (customer.name !== tempCustomer.name) equal = false;
        if (customer.industry !== tempCustomer.industry) equal = false;
        if (equal) {
            setChange(false);
        }
    });

    useEffect(() => {
        const url = baseUrl + "api/customers/" + id;
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (response.status == 404) {
                    setNotFound(true);
                }
                if (response.status === 401) {
                    navigate("/login", {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                if (!response.ok)
                    throw new Error("something went wrong, try again later");
                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer);
                setTempCustomer(data.customer);
                setError(undefined);
            })
            .catch((e) => {
                setError(e.message);
            });
    }, []);

    function updateCustomer(e) {
        e.preventDefault();
        const url = baseUrl + "api/customers/" + id;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify(tempCustomer),
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate("/login", {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                if (!response.ok) throw new Error("something went wrong");
                return response.json();
            })
            .then((data) => {
                setChange(false);
                setCustomer(data.customer);
                setError(undefined);
            })
            .catch((e) => {
                setError(e.message);
            });
    }

    return (
        <div className="p-3">
            {notFound ? <p>The customer with id: {id} was not found</p> : null}
            {customer ? (
                <div>
                    <form
                        className="w-full max-w-sm"
                        id="customer"
                        onSubmit={updateCustomer}
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id="name"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor="industry">Industry</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id="industry"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
                            </div>
                        </div>
                    </form>
                    {change ? (
                        <div className="mb-2">
                            <button
                                className="bg-slate-400 text-white py-2 px-4 mr-2 rounded-md hover:bg-slate-500"
                                onClick={(e) => {
                                    setTempCustomer({ ...customer });
                                    setChange(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600"
                                form="customer"
                            >
                                Save
                            </button>
                        </div>
                    ) : null}
                    <div>
                        <button
                            className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-500"
                            onClick={(e) => {
                                const url = baseUrl + "api/customers/" + id;
                                fetch(url, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                            "Bearer " +
                                            localStorage.getItem("access"),
                                    },
                                })
                                    .then((response) => {
                                        if (response.status === 401) {
                                            navigate("/login", {
                                                state: {
                                                    previousUrl:
                                                        location.pathname,
                                                },
                                            });
                                        }
                                        if (!response.ok) {
                                            throw new Error(
                                                "Something went wrong"
                                            );
                                        }
                                        setError(undefined);
                                        navigate("/customers");
                                    })
                                    .catch((e) => {
                                        setError(e.message);
                                    });
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : null}
            {error ? <p>{error}</p> : null}
            <br />
            <Link to="/customers">
                <button className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 no-underline">
                    &#129048; Go back
                </button>
            </Link>
        </div>
    );
}
