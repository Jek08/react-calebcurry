import "./App.css";
import { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { baseUrl } from "./shared";
import Register from "./pages/Register";

export const LoginContext = createContext();

function App() {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.access ? true : false
    );

    useEffect(() => {
        const minute = 1000 * 60;

        function refreshToken() {
            if (localStorage.refresh) {
                const url = baseUrl + "api/token/refresh";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh: localStorage.refresh,
                    }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        localStorage.access = data.access;
                        localStorage.refresh = data.refresh;
                        setLoggedIn(true);
                    });
            }
        }

        refreshToken();
        setInterval(() => {
            refreshToken();
        }, minute * 3);
    }, []);

    function changeLoggedIn(value) {
        setLoggedIn(false);
        if (value === false) {
            localStorage.clear();
        }
    }

    return (
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/customers/:id" element={<Customer />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route
                            path="/dictionary/:search"
                            element={<Definition />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Header>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

export default App;
