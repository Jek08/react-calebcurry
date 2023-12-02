import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
import { LoginContext } from "../App";

export default function Customer() {
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const location = useLocation();

    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        const url = baseUrl + "api/customers/";
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    setLoggedIn(false);
                    navigate("/login", {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                return response.json();
            })
            .then((data) => {
                setCustomers(data.customers);
            });
    }, []);

    function newCustomer(name, industry) {
        const data = { name: name, industry: industry };
        const url = baseUrl + "api/customers/";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something is wrong");
                }
                return response.json();
            })
            .then((data) => {
                // close the input modal
                setCustomers([...customers, data.customer]);
                toggleShow();
            })
            .catch((e) => console.log(e));
    }

    return (
        <>
            <h1>Here are The Customers</h1>
            {customers
                ? customers.map((customer) => {
                      return (
                          <div className="m-2" key={customer.id}>
                              <Link to={"/customers/" + customer.id}>
                                  <button className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600">
                                      {customer.name}
                                  </button>
                              </Link>
                          </div>
                      );
                  })
                : null}
            <AddCustomer
                newCustomer={newCustomer}
                show={show}
                toggleShow={toggleShow}
            />
        </>
    );
}
