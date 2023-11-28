import "./App.css";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./pages/NotFound";

function App() {
    return (
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
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Header>
        </BrowserRouter>
    );
}

export default App;
