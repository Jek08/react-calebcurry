import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AddCustomer(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                className="block mx-auto my-3 bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-500"
                onClick={handleShow}
            >
                + Add Customer
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        className="w-full max-w-sm"
                        id="editmodal"
                        onSubmit={(e) => {
                            e.preventDefault();
                            props.newCustomer(name, industry);
                            setName("");
                            setIndustry("");
                            handleClose();
                        }}
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="customername"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="customername"
                                    type="text"
                                    value={name}
                                    placeholder="IBM"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="industry"
                                >
                                    Industry
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="industry"
                                    type="text"
                                    value={industry}
                                    placeholder="IT Consulting"
                                    onChange={(e) =>
                                        setIndustry(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="bg-slate-400 text-white py-2 px-4 my-5 rounded-md hover:bg-slate-500"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="bg-sky-500 text-white py-2 px-4 my-5 rounded-md hover:bg-sky-600"
                        form="editmodal"
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
