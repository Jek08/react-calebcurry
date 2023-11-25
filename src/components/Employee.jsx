function Employee(props) {
    return (
        <div className="min-w-[250px] max-w-[300px] m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <div className="flex flex-col justify-center p-3">
                <img
                    className="w-40 h-40 mb-3 object-cover rounded-full self-center"
                    src={props.img}
                    alt="Profile Image"
                />
                <div className="flex flex-col justify-between items-center">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {props.name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {props.role}
                    </p>
                    {props.editEmployee}
                </div>
            </div>
        </div>
    );
}

export default Employee;
