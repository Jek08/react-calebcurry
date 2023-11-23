import EditEmployee from "./EditEmployee";

function Employee(props) {
    return (
        <div className="w-[400px] m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <div className="flex align-center p-10">
                <img
                    className="w-40 h-40 object-cover rounded-lg"
                    src={props.img}
                    alt="Profile Image"
                />
                <div className="text-center w-full h-full my-auto">
                    <h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
                        {props.name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {props.role}
                    </p>

                    <EditEmployee />
                </div>
            </div>
        </div>
    );
}

export default Employee;
