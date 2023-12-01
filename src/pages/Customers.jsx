import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customer() {
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        const url = baseUrl + "api/customers/";
        fetch(url)
            .then((response) => response.json())
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
