import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Employee from "../components/Employee";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import Header from "../components/Header";

function Employees() {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "Nuna",
            role: "Developer",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTQuyO8Mw-k4JUoKh5MnfhfMz4AycLb2Ujw&usqp=CAU",
        },
        {
            id: 2,
            name: "Abbi",
            role: "Manager",
            img: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
            id: 3,
            name: "Lupin",
            role: "Graphic Designer",
            img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
    ]);

    function updateEmployee(id, newName, newRole) {
        const updatedEmployees = employees.map((employee) => {
            if (id == employee.id) {
                return { ...employee, name: newName, role: newRole };
            }

            return employee;
        });
        setEmployees(updatedEmployees);
    }

    function newEmployee(name, role, img) {
        const newEmployee = {
            id: uuidv4(),
            name: name,
            role: role,
            img: img,
        };
        setEmployees([...employees, newEmployee]);
    }

    const showEmployees = true;

    return (
        <div className="App bg-gray-300 min-h-screen">
            {showEmployees ? (
                <>
                    <div className="flex flex-wrap justify-center mobile:flex-nowrap mobile:flex-col mobile:items-center">
                        {employees.map((employee) => {
                            const editEmployee = (
                                <EditEmployee
                                    id={employee.id}
                                    name={employee.name}
                                    role={employee.role}
                                    updateEmployee={updateEmployee}
                                />
                            );
                            return (
                                <Employee
                                    key={employee.id}
                                    id={employee.id}
                                    name={employee.name}
                                    role={employee.role}
                                    img={employee.img}
                                    editEmployee={editEmployee}
                                />
                            );
                        })}
                    </div>
                    <AddEmployee newEmployee={newEmployee} />
                </>
            ) : (
                <p>You are not allowed to see the Employees</p>
            )}
        </div>
    );
}

export default Employees;
