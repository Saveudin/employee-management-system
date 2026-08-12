import { Link } from 'react-router-dom';
import type { Employee } from '../types/Employee';

interface EmployeeCardProps {
    employee: Employee;
    deleteEmployee: (id: number) => void;
    editEmployee: (id: number) => void;
}

function EmployeeCard({employee, deleteEmployee, editEmployee}: EmployeeCardProps){
    return (
        <div>
            
            <p>{employee.name}</p>
            <p>{employee.department}</p>
            <p>{employee.position}</p>
            <p>{employee.email}</p>
            <div>

            <Link
                to={`/employees/${employee.id}`}
                >
                View Detail
            </Link>
            </div>
            <button onClick={() => editEmployee(employee.id)}>Edit</button>
            <button onClick={() => deleteEmployee(employee.id)}>Delete Employee</button>
        </div>
    )
}

export default EmployeeCard;