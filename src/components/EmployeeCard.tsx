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
            <button onClick={() => editEmployee(employee.id)}>Edit</button>
            <button onClick={() => deleteEmployee(employee.id)}>Delete Employee</button>
        </div>
    )
}

export default EmployeeCard;