function Employee(props) {
    return (
        <div className="min-w-[150px] max-w-[300] m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <div className="flex flex-wrap p-10">
                <img
                    className="w-40 h-40 mx-2 object-cover rounded-lg"
                    src={props.img}
                    alt="Profile Image"
                />
                <div className="flex flex-col mx-2 justify-between text-center">
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
